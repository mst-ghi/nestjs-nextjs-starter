import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Store from '@store/index';
import Layout from '@components/templates/layout';
import '@styles/globals.scss';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={Store}>{getLayout(<Component {...pageProps} />)}</ReduxProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
