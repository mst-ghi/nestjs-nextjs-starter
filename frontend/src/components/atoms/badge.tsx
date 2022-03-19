import { memo } from 'react';
import dynamic from 'next/dynamic';
import Icon, { IconProps } from './icon';

const Colors = {
  default: '',
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  ghost: 'badge-ghost',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
};

const Sizes = {
  default: '',
  xs: 'badge-xs',
  sm: 'badge-sm',
  md: 'badge-md',
  lg: 'badge-lg',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: keyof typeof Colors;
  size?: keyof typeof Sizes;
  icon?: IconProps | undefined;
  outline?: boolean;
}

const BadgeComponent = memo<BadgeProps>(
  ({
    color = 'default',
    size = 'default',
    outline = false,
    icon,
    className,
    children,
    ...props
  }) => {
    return (
      <span
        className={['badge', Colors[color], Sizes[size], outline && 'badge-outline', className]
          .join(' ')
          .replace(/\s+/g, ' ')}
        {...props}
      >
        {icon && <Icon className="mr-1" {...icon} />}
        {children}
      </span>
    );
  }
);

const Badge = dynamic(() => Promise.resolve(BadgeComponent), {
  ssr: false,
});

export default Badge;
