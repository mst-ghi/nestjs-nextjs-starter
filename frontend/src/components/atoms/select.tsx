/* eslint-disable @typescript-eslint/no-explicit-any */
import { LegacyRef, forwardRef } from 'react';
import { FieldErrors } from 'react-hook-form';
import { toTitleCase } from '@utils/string';

const Colors = {
  default: 'select-bordered',
  primary: 'select-primary',
  secondary: 'select-secondary',
  accent: 'select-accent',
  info: 'select-info',
  success: 'select-success',
  warning: 'select-warning',
  error: 'select-error',
};

const Sizes = {
  default: '',
  xs: 'select-xs',
  sm: 'select-sm',
  md: 'select-md',
  lg: 'select-lg',
};

interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  name: string;
  color?: keyof typeof Colors;
  size?: keyof typeof Sizes;
  disabledLabel?: string;
  placeholder?: string;
  label?: string;
  altLabel?: string;
  error?: FieldErrors;
  wrapperClass?: string;
  ghost?: boolean;
  options?: any[];
  getOptionLabel: (el: any) => any;
  getOptionValue: (el: any) => any;
  onSelect?: (el: any) => void;
}

const Select = forwardRef(
  (
    {
      name,
      color = 'default',
      size = 'default',
      defaultValue,
      disabledLabel,
      placeholder,
      label,
      altLabel,
      error,
      wrapperClass,
      ghost = false,
      className,
      options,
      getOptionLabel,
      getOptionValue,
      onSelect,
      ...props
    }: SelectProps,
    ref: LegacyRef<HTMLSelectElement> | undefined
  ) => {
    const renderOptions = () => {
      return options?.map((opt, index) => {
        return (
          <option key={`${name}-opt-${index}`} value={getOptionValue(opt)}>
            {getOptionLabel(opt)}
          </option>
        );
      });
    };

    return (
      <div className={['form-control w-full mb-1.5', wrapperClass].join(' ')}>
        {label && (
          <label className="label py-0.5">
            <span className="label-text font-normal">{label}</span>
            {altLabel && <span className="label-text-alt font-light">{altLabel}</span>}
          </label>
        )}

        <select
          ref={ref}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue || 0}
          className={[
            'select rounded-md w-full',
            Colors[color],
            Sizes[size],
            ghost && 'select-ghost',
            error && error[name] && 'select-error',
            className,
          ]
            .join(' ')
            .replace(/\s+/g, ' ')}
          onInput={(evt) => {
            if (onSelect) {
              onSelect((evt.target as HTMLInputElement).value);
            }
          }}
          {...props}
        >
          <option value={0} disabled className="text-gray-400">
            {disabledLabel || `Select ${label || 'option'}`}
          </option>
          {renderOptions()}
        </select>

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

export default Select;
