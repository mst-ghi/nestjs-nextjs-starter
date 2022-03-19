import React from 'react';
import dynamic from 'next/dynamic';

const Aligns = {
  top: '',
  bottom: 'tooltip-bottom',
  left: 'tooltip-left',
  right: 'tooltip-right',
};

const Colors = {
  primary: 'tooltip-primary',
  secondary: 'tooltip-secondary',
  accent: 'tooltip-accent',
  info: 'tooltip-info',
  success: 'tooltip-success',
  warning: 'tooltip-warning',
  error: 'tooltip-error',
};

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: keyof typeof Colors;
  align?: keyof typeof Aligns;
  dataTip: string;
}

const TooltipComponent = React.memo<TooltipProps>(
  ({ color, align = 'top', dataTip, className, children, ...props }) => {
    return (
      <div
        className={['tooltip', color && Colors[color], Aligns[align]]
          .join(' ')
          .replace(/\s+/g, ' ')}
        data-tip={dataTip}
        {...props}
      >
        {children}
      </div>
    );
  }
);

const Tooltip = dynamic(() => Promise.resolve(TooltipComponent), {
  ssr: false,
});

export default Tooltip;
