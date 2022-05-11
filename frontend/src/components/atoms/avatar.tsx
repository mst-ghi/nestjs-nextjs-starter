import { memo } from 'react';
import { toFirstLetters } from '@utils/string';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | undefined;
  alt?: string | undefined;
  placeholder?: string | undefined;
  online?: boolean | undefined;
  rounded?: boolean | undefined;
  square?: boolean;
  offline?: boolean | undefined;
  ring?: boolean | undefined;
  letterClass?: string | undefined;
  wrapperClass?: string | undefined;
}

const Avatar = memo<AvatarProps>(
  ({
    src,
    alt,
    placeholder,
    online,
    offline,
    rounded,
    square,
    ring,
    letterClass,
    wrapperClass,
    className,
    ...props
  }) => {
    return (
      <div
        className={[
          'avatar',
          online && 'online',
          offline && 'offline',
          placeholder && 'placeholder',
          wrapperClass,
        ]
          .join(' ')
          .replace(/\s+/g, ' ')}
      >
        <div
          className={[
            square && 'rounded',
            rounded && 'rounded-full',
            ring && 'ring ring-gray-200 ring-offset-base-100 ring-offset-1',
            placeholder && 'bg-gray-600 text-neutral-content',
            className,
          ]
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim()}
          {...props}
        >
          {src && (
            <img
              data-testid={`test-avatar-img-${placeholder}`}
              src={src}
              alt={alt || placeholder}
            />
          )}
          {placeholder && !src && (
            <span data-testid={`test-avatar-ph-${placeholder}`} className={letterClass}>
              {toFirstLetters(placeholder).toUpperCase()}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default Avatar;
