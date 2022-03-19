import { LegacyRef, forwardRef } from 'react';
import { FieldErrors } from 'react-hook-form';
import { toTitleCase } from '@utils/string';

const Colors = {
  default: '',
  primary: 'toggle-primary',
  secondary: 'toggle-secondary',
  accent: 'toggle-accent',
};

const Sizes = {
  xs: 'toggle-xs',
  sm: 'toggle-sm',
  md: 'toggle-md',
  lg: 'toggle-lg',
};

interface ToggleProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'size'> {
  name: string;
  color?: keyof typeof Colors;
  size?: keyof typeof Sizes;
  label?: string;
  disabled?: boolean | undefined;
  altLabel?: string;
  error?: FieldErrors;
  wrapperClass?: string;
  isChecked?: boolean;
}

const Toggle = forwardRef(
  (
    {
      name,
      color = 'default',
      size = 'md',
      label,
      altLabel,
      disabled,
      error,
      wrapperClass,
      isChecked = false,
      className,
      ...props
    }: ToggleProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <div className={['form-control w-full mb-1.5', wrapperClass].join(' ')}>
        <div className="flex flex-row">
          <input
            ref={ref}
            name={name}
            type="checkbox"
            defaultChecked={isChecked}
            disabled={disabled}
            className={['toggle', Colors[color], Sizes[size], className]
              .join(' ')
              .replace(/\s+/g, ' ')}
            {...props}
          />

          {label && (
            <label className="label py-0.5 ml-1">
              <span className="label-text font-normal">{label}</span>
              {altLabel && <span className="label-text-alt font-light">{altLabel}</span>}
            </label>
          )}
        </div>

        {error && error[name] && (
          <label className="label pt-1 pb-0">
            <span className="label-text-alt text-red-500">
              {toTitleCase(error[name].message.replaceAll('"', '').replaceAll('_', ' '))}
            </span>
          </label>
        )}
      </div>
    );
  }
);

export default Toggle;
