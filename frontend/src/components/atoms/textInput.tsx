import { LegacyRef, forwardRef } from 'react';
import { FieldErrors } from 'react-hook-form';
import { toTitleCase } from '@utils/string';

const Colors = {
  default: 'input-bordered',
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  info: 'input-info',
  success: 'input-success',
  warning: 'input-warning',
  error: 'input-error',
};

const Sizes = {
  default: '',
  xs: 'input-xs',
  sm: 'input-sm',
  md: 'input-md',
  lg: 'input-lg',
};

interface TextInputProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  type?: string;
  color?: keyof typeof Colors;
  size?: keyof typeof Sizes;
  placeholder?: string;
  label?: string;
  altLabel?: string;
  error?: FieldErrors;
  wrapperClass?: string;
  ghost?: boolean;
}

const TextInput = forwardRef(
  (
    {
      name,
      type = 'text',
      color = 'default',
      size = 'default',
      placeholder,
      label,
      altLabel,
      error,
      wrapperClass,
      ghost = false,
      defaultValue,
      className,
      ...props
    }: TextInputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <div className={['form-control w-full mb-1.5', wrapperClass].join(' ')}>
        {label && (
          <label className="label py-0.5">
            <span className="label-text font-normal">{label}</span>
            {altLabel && <span className="label-text-alt font-light">{altLabel}</span>}
          </label>
        )}

        <input
          id={props.id || `input-${name}`}
          ref={ref}
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={[
            'input rounded-md w-full',
            Colors[color],
            Sizes[size],
            ghost && 'input-ghost',
            error && error[name] && 'input-error',
            className,
          ]
            .join(' ')
            .replace(/\s+/g, ' ')}
          {...props}
        />

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

export default TextInput;
