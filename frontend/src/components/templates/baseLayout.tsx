import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import Head from 'next/head';
import { envs } from '@utils/constants';
import useApp from '@hooks/useApp';
import useAuth from '@hooks/useAuth';
import ConfirmDialog from '@components/molecules/confirmDialog';
import SettingsDialog from '@components/molecules/settingsDialog';

if (typeof window !== 'undefined') {
  injectStyle();
}

interface BaseLayoutProps {
  children?: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const { initializeAuthData } = useAuth();
  const { direction, theme } = useApp();

  useEffect(() => {
    (async () => {
      await initializeAuthData();
    })();
  }, []);

  return (
    <div className="flex-1 flex flex-col relative" dir={direction} data-theme={theme}>
      <Head>
        <title>{envs.siteTitle}</title>
        <meta property="og:site_name" content={envs.siteTitle} key="ogsitename" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>{children}</div>

      <SettingsDialog />
      <ConfirmDialog />
      <ToastContainer />

      <div className="flex flex-col container justify-center items-center pb-4 pt-10">
        <span className="text-gray-400 text-xs font-medium ">
          ©{new Date().getFullYear()} ATS System. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default BaseLayout;
