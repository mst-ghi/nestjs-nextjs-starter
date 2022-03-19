/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FieldErrors } from 'react-hook-form';
import Select from 'react-select';
import { toTitleCase } from '@utils/string';

interface SelectInputComponentProps extends ReactSelect.CommonProps {
  control?: any;
  name: string;
  label?: string;
  altLabel?: string;
  error?: FieldErrors;
  wrapperClass?: string;
}

const SelectInput = ({
  isMulti,
  control,
  name,
  placeholder,
  label,
  altLabel,
  error,
  className,
  wrapperClass,
  values,
  onSelect,
  ...props
}: SelectInputComponentProps) => {
  return (
    <div className={['form-control w-full mb-1.5', wrapperClass].join(' ')}>
      {label && (
        <label className="label py-0.5">
          <span className="label-text font-normal">{label}</span>
          {altLabel && <span className="label-text-alt font-light">{altLabel}</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onBlur, onChange, ref: ctrlRef } }) => {
          return (
            <Select
              id={props.id || `select-${name}`}
              inputRef={ctrlRef}
              className={['react-select', className].join(' ')}
              placeholder={placeholder}
              onBlur={onBlur}
              isMulti={isMulti}
              onChange={(options: any) => {
                if (onSelect) {
                  onSelect(options);
                }
                if (isMulti) {
                  onChange(
                    options?.map((option: any) => {
                      return option.value;
                    })
                  );
                } else {
                  onChange(options.value);
                }
              }}
              {...props}
            />
          );
        }}
      />

      {error && error[name] && (
        <label className="label pt-1 pb-0">
          <span className="label-text-alt text-red-500">
            {toTitleCase(error[name]?.message?.replaceAll('"', '').replaceAll('_', ' '))}
          </span>
        </label>
      )}
    </div>
  );
};

export default SelectInput;
