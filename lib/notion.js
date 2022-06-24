import { Client } from '@notionhq/client';

const notionClient = new Client({ auth: process.env.NOTION_KEY });

export const getImageUrl = (cover, blockId) => {
  let url = cover?.[cover.type]?.url || null;

  if (!url) {
    return null;
  }

  if (url.startsWith('data:')) {
    return url;
  }

  if (url.startsWith('/images')) {
    url = `https://www.notion.so${url}`;
  }

  // more recent versions of notion don't proxy unsplash images
  if (!url.startsWith('https://images.unsplash.com')) {
    url = `https://www.notion.so${
      url.startsWith('/image') ? url : `/image/${encodeURIComponent(url)}`
    }`;

    const notionImageUrlV2 = new URL(url);

    notionImageUrlV2.searchParams.set('table', 'block');
    notionImageUrlV2.searchParams.set('id', blockId);
    notionImageUrlV2.searchParams.set('cache', 'v2');

    url = notionImageUrlV2.toString();
  }

  return url;
};

export const extractPageData = (page) => {
  const { properties } = page;
  try {
    return {
      id: page.id,
      coverUrl: getImageUrl(page.cover, page.id),
      title: properties.title?.title[0].plain_text,
      description: properties.description?.rich_text[0]?.plain_text || '',
      tags: properties.tags?.multi_select,
      author: properties.author?.people[0] || null,
      created_at: properties.created_at?.created_time,
      updated_at: properties.updated_at?.last_edited_time,
      published_at: properties.published_at?.date?.start || null,
    };
  } catch (e) {
    console.error(`${e}`);
    return { id: page.id };
  }
};

export async function getMenu() {
  try {
    const manufactureGeneralProps = (data) => ({
      created_at: data.created_time,
      updated_at: data.last_edited_time,
      id: data.id,
    });
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_MENU_DB_KEY,
    });
    return response;

    const data = response.results.map(async (result) => {
      const childrenBlocks = await getPageBlocks(result.id);
      const childrenPromise = childrenBlocks.map(async ({ type, ...item }) => {
        const { response } =
          type === 'child_page'
            ? 'await [getPage(item.id)]'
            : await getDatabase(item.id);

        return {
          title: item[type].title,
          type,
          childrenPages: response,
          ...manufactureGeneralProps(item),
        };
      });

      const childrend = await Promise.all(childrenPromise);
      return {
        ...manufactureGeneralProps(result),
        parentId: result.parent.database_id,
        cover: result.cover.file?.url,
        title: result.properties.title.title[0].plain_text,
        description: result.properties.description.rich_text[0].plain_text,
        childrend,
      };
    });
    return Promise.all(data);
  } catch (error) {
    return error;
  }
}

export async function getDatabase(database_id, option = {}) {
  const response = await notionClient.databases.query({
    database_id,
  });

  return { response };
  // const {
  //   page_size = 100,
  //   sorts = [
  //     { property: 'priority', direction: 'ascending' },
  //     { property: 'published_at', direction: 'descending' },
  //     { property: 'updated_at', direction: 'descending' },
  //   ],
  //   filter = {
  //     and: [
  //       {
  //         property: 'published',
  //         checkbox: { equals: true },
  //       },
  //     ],
  //   },
  // } = option;

  // let pages = [];
  // let startCursor;

  // while (pages.length < page_size) {
  //   const { results, has_more, next_cursor } =
  //     await notionClient.databases.query({
  //       database_id,
  //       start_cursor: startCursor,
  //       page_size: Number(page_size),
  //       sorts,
  //       filter,
  //     });

  //   pages.push(...results);
  //   startCursor = next_cursor;

  //   if (!has_more) {
  //     break;
  //   }
  // }

  // const data = pages.map(extractPageData);
  // return data;
}

export async function getPage(page_id) {
  const res = await notionClient.pages.retrieve({ page_id });
  return res;
}

export async function getBlock(block_id) {
  const res = await notionClient.blocks.retrieve({ block_id });

  return res;
}

export async function getList(page_id) {
  try {
    const pageRes = await getPage(page_id);
    const blockRes = await getPageBlocks(page_id);

    const data = await Promise.all(
      blockRes.map(async (child) => {
        const children =
          child.type === 'child_page'
            ? await notion.getPage(child.id)
            : await notion.getDatabase(child.id);
        return {
          ...child,
          children,
        };
      })
    );

    return data;
    // const res = await notionClient.pages.retrieve({ page_id });
    // return res;
  } catch (error) {
    return error;
  }
}

export async function getPageMeta(page_id) {
  const res = await notionClient.pages.retrieve({ page_id });

  const data = extractPageData(res);
  return data;
}

export async function getPageBlocks(block_id) {
  let blocks = [];
  let startCursor;

  let hasMore = true;
  while (hasMore) {
    const { results, has_more, next_cursor } =
      await notionClient.blocks.children.list({
        block_id: block_id,
        start_cursor: startCursor,
      });

    blocks.push(...results);

    hasMore = has_more;
    startCursor = next_cursor;
  }
  return blocks;

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await notion.getPageBlocks(block.id),
        };
      })
  );

  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type].children = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }

    if (block.type === 'image') {
      const { image } = block;

      const imgUrl = getImageUrl(image, block.id);
      const caption = image.caption[0]?.text.plain_text || '';
      const markdownImageUrl = `![${caption}](${imgUrl})}`;

      block.type = 'paragraph';
      block.paragraph = {
        text: [
          {
            plain_text: markdownImageUrl,
            text: {
              content: markdownImageUrl,
              link: null,
            },
          },
        ],
      };
    }

    return block;
  });

  return blocksWithChildren;
}

export async function getTags(database_id) {
  const { properties } = await notionClient.databases.retrieve({
    database_id,
  });

  return properties?.tags.multi_select.options;
}

const notion = {
  getList,
  getDatabase,
  getPage,
  getBlock,
  getPageMeta,
  getPageBlocks,
  getTags,
  getMenu,
};

export default notion;
