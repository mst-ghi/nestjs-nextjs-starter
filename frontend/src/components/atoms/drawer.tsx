/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import dynamic from 'next/dynamic';

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean | undefined;
  height?: number | string | undefined;
  margin?: number | undefined;
  width?: number | undefined;
}

const DrawerComponent = memo<DrawerProps>(
  ({ isOpen = false, height, margin = 10, width = 220, className, children, ...props }) => {
    let drawerHeight = height;
    if (!drawerHeight) {
      drawerHeight = margin ? `calc(100vh - ${margin * 2}px)` : '100vh';
    }
    let styles: any = {
      height: '100vh',
      width,
      top: 0,
      left: 0,
      bottom: 0,
    };
    if (isOpen) {
      styles = {
        height: drawerHeight,
        width,
        left: margin,
        top: margin,
        bottom: margin,
      };
    }

    return (
      <div
        className={[
          'transform ease-in-out transition-all duration-200',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'bg-white fixed overflow-auto z-50 shadow-lg rounded-lg',
          className,
        ]
          .join(' ')
          .replace(/\s+/g, ' ')}
        style={styles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const Drawer = dynamic(() => Promise.resolve(DrawerComponent), {
  ssr: false,
});

export default Drawer;
