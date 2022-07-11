import { Row, Typography } from 'antd';
import Image from 'next/image';
import notion from '@/lib/notion';
import ListCard from '@/components/ListCard';

const { Paragraph, Title } = Typography;

export default function List() {
  // if (!data) return;
  const data = Array(20)
    .fill(null)
    .map((_, idx) => idx);
  return (
    <>
      {/* <div>
        <Title>Projects</Title>
        <Paragraph style={{ fontSize: 20 }}>
          프로젝트에 대한 페이지 입니다{' '}
        </Paragraph>
      </div> */}
      <ListCard data={data} />
    </>
  );
}

// export const getStaticProps = async ({ params }) => {
//   const data = await notion.getList(params.list);

//   return {
//     props: {
//       data,
//     },
//   };
// };

// export async function getStaticPaths(ctx) {
//   return {
//     paths: [],
//     fallback: true,
//   };
// }
