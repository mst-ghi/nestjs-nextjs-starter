import { LegacyRef, forwardRef } from 'react';
import { FieldErrors } from 'react-hook-form';
import { toTitleCase } from '@utils/string';

const Colors = {
  default: 'textarea-bordered',
  primary: 'textarea-primary',
  secondary: 'textarea-secondary',
  accent: 'textarea-accent',
  info: 'textarea-info',
  success: 'textarea-success',
  warning: 'textarea-warning',
  error: 'textarea-error',
};

interface TextareaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder?: string;
  label?: string;
  color?: keyof typeof Colors;
  altLabel?: string;
  error?: FieldErrors;
  wrapperClass?: string;
  ghost?: boolean;
  rows?: number;
}

const Textarea = forwardRef(
  (
    {
      name,
      placeholder,
      color = 'default',
      label,
      altLabel,
      error,
      wrapperClass,
      ghost = false,
      rows = 4,
      className,
      ...props
    }: TextareaProps,
    ref: LegacyRef<HTMLTextAreaElement> | undefined
  ) => {
    return (
      <div className={['form-control w-full mb-1.5', wrapperClass].join(' ')}>
        {label && (
          <label className="label py-0.5">
            <span className="label-text font-normal">{label}</span>
            {altLabel && <span className="label-text-alt font-light">{altLabel}</span>}
          </label>
        )}

        <textarea
          id={props.id || `input-${name}`}
          ref={ref}
          name={name}
          placeholder={placeholder}
          className={[
            'textarea rounded-md w-full',
            Colors[color],
            error && error[name] && 'textarea-error',
            ghost && 'textarea-ghost',
            className,
          ]
            .join(' ')
            .replace(/\s+/g, ' ')}
          rows={rows}
          {...props}
        ></textarea>

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

export default Textarea;
