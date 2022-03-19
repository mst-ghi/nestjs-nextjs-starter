import { memo } from 'react';
import dynamic from 'next/dynamic';

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  button: React.ReactNode;
  tabIndex?: number | undefined;
  right?: boolean;
  left?: boolean;
  end?: boolean;
  top?: boolean;
  width: string;
}

const DropdownComponent = memo<DropdownProps>(
  ({ button, tabIndex = 0, right, left, end, top, width, className, children, ...props }) => {
    return (
      <div
        className={[
          'dropdown',
          top && 'dropdown-top',
          left && 'dropdown-left',
          end && 'dropdown-end',
          right && 'dropdown-right',
        ]
          .join(' ')
          .replaceAll('false', '')
          .replace(/\s+/g, ' ')}
      >
        <div
          tabIndex={tabIndex}
          className={['cursor-pointer', className]
            .join(' ')
            .replaceAll('false', '')
            .replace(/\s+/g, ' ')}
          {...props}
        >
          {button}
        </div>
        <ul
          tabIndex={tabIndex}
          className={['p-2 shadow menu dropdown-content bg-base-100 rounded-box', width].join(' ')}
        >
          {children}
        </ul>
      </div>
    );
  }
);

const Dropdown = dynamic(() => Promise.resolve(DropdownComponent), {
  ssr: false,
});

export default Dropdown;
