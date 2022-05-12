import { memo } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { envs } from '@utils/constants';
import useApp from '@hooks/useApp';
import Spinner from '@components/atoms/spinner';

interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  displayTitle?: string;
  description?: string;
  showPageTitle?: boolean;
  isLoading?: boolean;
  right?: React.ReactNode;
  withOverflowHandler?: boolean;
  meta?: {
    title?: string;
    description?: string;
    cover?: string;
  };
}

const PageContentComponent = memo<PageContentProps>(
  ({ title, isLoading = false, withOverflowHandler = true, children, meta, className }) => {
    const router = useRouter();
    const { isGlobalLoading } = useApp();

    return (
      <div
        className={[
          'px-6 pb-4 pt-2 flex-1 relative',
          withOverflowHandler && 'overflow-auto',
          className,
        ].join(' ')}
      >
        <Head>
          <title>{`${title} - ${envs.siteTitle}`}</title>
          <meta property="og:title" content={`${title} - ${envs.siteTitle}`} key="ogtitle" />
          <meta name="twitter:card" content={`${title} - ${envs.siteTitle}`} key="twcard" />
          <meta property="og:url" content={router.asPath} key="ogurl" />

          {meta?.title && <meta property="og:title" content={meta.title} key="ogtitle" />}
          {meta?.title && <meta name="twitter:card" content={meta.title} key="twcard" />}

          {meta?.description && <meta name="description" content={meta.description} />}
          {meta?.description && (
            <meta property="og:description" content={meta.description} key="ogdesc" />
          )}

          {meta?.cover && <meta property="og:image" content={meta.cover} key="ogimage" />}
        </Head>

        {(isLoading || isGlobalLoading) && (
          <div
            className="absolute flex justify-center items-center top-0 left-0 right-0"
            style={{ height: '80%' }}
          >
            <Spinner type="tail-spin" size={100} />
          </div>
        )}
        {!isLoading && !isGlobalLoading && children}
      </div>
    );
  }
);

const PageContent = dynamic(() => Promise.resolve(PageContentComponent), {
  ssr: false,
});

export default PageContent;
