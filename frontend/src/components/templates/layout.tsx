import { memo } from 'react';
import dynamic from 'next/dynamic';
import BaseHeader from '@components/templates/core/header';
import BaseLayout from './baseLayout';

const LayoutComponent = memo<{ children: React.ReactNode }>(({ children }) => {
  return (
    <BaseLayout>
      <div className={['min-h-screen flex-1 flex flex-col'].join(' ')}>
        <BaseHeader />

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">{children}</div>
        </div>
      </div>
    </BaseLayout>
  );
});

const Layout = dynamic(() => Promise.resolve(LayoutComponent), {
  ssr: false,
});

export default Layout;
