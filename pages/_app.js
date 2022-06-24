import Header from '@/components/Header';
import BasicLayout from '@/layouts/BasicLayout';
import '../styles/globals.css';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function MyApp({ Component, pageProps }) {
  const { data: menu, error } = useSWR('/api/menu', fetcher);

  return (
    <>
      <Header menu={menu} />
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </>
  );
}

export default MyApp;
