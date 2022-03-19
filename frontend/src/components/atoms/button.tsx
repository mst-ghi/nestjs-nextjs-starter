import { LegacyRef, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Icon, { IconProps } from './icon';

const Colors = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
  ghost: 'btn-ghost',
  link: 'btn-link',
};

const Sizes = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  lg: 'btn-lg',
};

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: keyof typeof Colors;
  size?: keyof typeof Sizes;
  wide?: boolean;
  outlined?: boolean;
  square?: boolean;
  circle?: boolean;
  glass?: boolean;
  disabled?: boolean;
  block?: boolean;
  isLoading?: boolean;
  noAnimation?: boolean;
  icon?: IconProps | undefined;
  href?: string | undefined;
}

const ButtonComponent = forwardRef(
  (
    {
      children,
      size,
      color = 'primary',
      type,
      outlined,
      square,
      circle,
      wide,
      glass,
      disabled,
      block,
      isLoading,
      noAnimation,
      icon,
      href,
      className,
      ...props
    }: ButtonProps,
    ref: LegacyRef<HTMLButtonElement> | undefined
  ) => {
    const classes = [
      'btn',
      Colors[color],
      size && Sizes[size],
      outlined && 'btn-outline',
      square && 'btn-square',
      circle && 'btn-circle',
      glass && `glass`,
      wide && `btn-wide`,
      block && 'btn-block',
      isLoading && 'loading',
      noAnimation && 'no-animation',
      disabled && 'btn-disabled',
      className,
    ]
      .join(' ')
      .replace(/\s+/g, ' ');

    if (href) {
      return (
        <Link href={href}>
          <a className={classes} {...props}>
            {children}
          </a>
        </Link>
      );
    }

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {icon && <Icon {...icon} />}
        {children}
      </button>
    );
  }
);

const Button = dynamic(() => Promise.resolve(ButtonComponent), {
  ssr: false,
});

export default Button;
