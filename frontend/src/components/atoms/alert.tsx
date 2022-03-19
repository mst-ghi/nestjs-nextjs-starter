import { memo } from 'react';
import dynamic from 'next/dynamic';
import Icon, { IconProps } from './icon';

const Colors = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
};

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: keyof typeof Colors;
  icon?: IconProps | undefined;
}

const AlertComponent = memo<AlertProps>(
  ({ color = 'info', icon, className, children, ...props }) => {
    return (
      <div
        className={['alert', Colors[color], className, 'shadow-sm'].join(' ').replace(/\s+/g, ' ')}
        {...props}
      >
        <div>
          {icon && <Icon {...icon} />}
          {children}
        </div>
      </div>
    );
  }
);

const Alert = dynamic(() => Promise.resolve(AlertComponent));

export default Alert;
