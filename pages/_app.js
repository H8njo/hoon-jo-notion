import { SWRConfig } from 'swr';

import Header from '@/components/Header';
import BasicLayout from '@/layouts/BasicLayout';
import '@/styles/globals.css';
import '@/styles/variables.less';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        dedupingInterval: 2000,
        fetcher,
      }}
    >
      <Header />
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </SWRConfig>
  );
}

export default MyApp;
