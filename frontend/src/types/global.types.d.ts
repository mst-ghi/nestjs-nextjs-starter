/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace ReactSelect {
  declare interface CommonProps
    extends AppInputDefaultProps,
      React.InputHTMLAttributes<HTMLInputElement> {
    ref?: any;
    inputRef?: any;
    clearValue?: () => void;
    className?: string;
    cx?: (state: ClassNamesState | void, className: string | void) => string | void;
    getStyles?: (string, any) => unknown;
    getValue?: () => ValueType;
    hasValue?: boolean;
    isMulti?: boolean;
    isRtl?: boolean;
    options?: OptionsType;
    selectOption?: (val?: OptionType) => void;
    selectProps?: any;
    setValue?: (ValueType, ActionTypes) => void;
    theme?: Theme;
    instanceId?: string;
    getOptionLabel?: (el: any) => void;
    getOptionValue?: (el: any) => void;
    placeholder?: string;
    isClearable?: boolean;
    isSearchable?: boolean;
    cacheOptions?: boolean;
    defaultOptions?: boolean;
    onInputChange?: (value: any) => void;
    noOptionsMessage?: any;
    classNamePrefix?: string;
    defaultValue?: any | undefined;
    onChange?: any;
    value?: any;
    loadOptions?: any;
    controlShouldRenderValue?: boolean;
    searchable?: boolean;
    menuIsOpen?: boolean;
    menuPlacement?: MenuPlacement;
    filterOption?: (value: any) => boolean;
    values?: any[];
    onSelect?: (value: any) => void;
  }
}

declare module 'react-select' {
  const Select: React.FC<ReactSelect.CommonProps>;
  export = Select;
}

declare module 'react-select/async' {
  const Select: React.FC<ReactSelect.CommonProps>;
  export = Select;
}

declare type ErrorResField = { field: any; message: string };

declare type SelectDefaultOptionType = { value: string; label: string };
