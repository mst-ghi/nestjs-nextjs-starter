import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

export declare type SigninFormType = {
  email: string;
  password: string;
};

export const SchemaSignIn = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: passwordComplexity({
    min: 8,
    max: 30,
    lowerCase: 0,
    upperCase: 0,
    numeric: 0,
    symbol: 0,
    requirementCount: 4,
  }),
});

export declare type SignUpFormType = {
  email: string;
  password: string;
  full_name: string;
};

export const SchemaSignUp = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: passwordComplexity({
    min: 8,
    max: 30,
    lowerCase: 0,
    upperCase: 0,
    numeric: 0,
    symbol: 0,
    requirementCount: 4,
  }),
  full_name: Joi.string().min(3).required(),
});

export declare type ProfileFormType = {
  avatar_id?: number;
  country_id: number;
  province_id: number;
  city: string;
  title: string;
  spoken_langs: string[];
  tags: string[];
  about: string;
};

export const SchemaProfile = Joi.object({
  country_id: Joi.number().required(),
  province_id: Joi.number().required(),
  city: Joi.string().min(2).required(),
  title: Joi.string().min(6).required(),
  about: Joi.string().min(6).required(),
  tags: Joi.array().items(Joi.string()).required(),
  spoken_langs: Joi.array().items(Joi.string()).required(),
});
