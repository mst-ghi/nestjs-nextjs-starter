import { joiResolver } from '@hookform/resolvers/joi';
import { AsyncValidationOptions, ObjectSchema, Schema } from 'joi';
import { CriteriaMode, DefaultValues, FieldValues, Mode, useForm } from 'react-hook-form';
import useAlert from './useAlert';

const useJoiForm = <
  TFieldValues extends FieldValues = FieldValues,
  T extends Schema = ObjectSchema<TFieldValues>,
  TContext extends object = object
>({
  schema,
  schemaOptions,
  factoryOptions,
  ...props
}: {
  schema: T;
  schemaOptions?: AsyncValidationOptions;
  factoryOptions?: {
    mode?: 'async' | 'sync';
  };
  mode?: Mode;
  reValidateMode?: Exclude<Mode, 'onTouched' | 'all'>;
  defaultValues?: DefaultValues<TFieldValues>;
  context?: TContext;
  shouldFocusError?: boolean;
  shouldUnregister?: boolean;
  shouldUseNativeValidation?: boolean;
  criteriaMode?: CriteriaMode;
  delayError?: number;
}) => {
  const { catchToast } = useAlert();

  const form = useForm({
    resolver: joiResolver(schema, schemaOptions, factoryOptions),
    ...props,
  });

  const setErrors = (error: Error) => {
    const { errors: resErrors } = catchToast({ error });
    if (resErrors) {
      resErrors.map((err) => form.setError(err.field, err));
    }
  };

  return {
    ...form,
    setErrors,
  };
};

export default useJoiForm;
