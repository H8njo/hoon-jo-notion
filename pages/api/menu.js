import notion from '@/lib/notion';

export default async function (req, res) {
  const data = await notion.getMenu();
  console.log(data);
  const response = data.results.map((page) => ({
    id: page.id,
    created_at: page.created_time,
    updated_at: page.last_edited_time,
    cover: page.cover?.file.url,
    title: page.properties.title.title[0].text.content,
    description: page.properties.description.rich_text[0]?.text.content,
    menuBackground:
      page.properties.background.rich_text[0]?.text.content.split(','),
  }));
  res.status(200).json(response);
}
