interface ITimestamps {
  created_at?: string;
  updated_at?: string;
}

declare type RoleKeysType = 'super-admin' | 'admin' | 'mentor' | 'member';

interface IRole extends ITimestamps {
  id: number;
  key: RoleKeysType;
  title: string;
  department?: string;
  description?: string;
}

interface ILanguage extends ITimestamps {
  id: number;
  key: string;
  title: string;
}

interface ITag extends ITimestamps {
  id: number;
  key: string;
  title: string;
  is_active?: boolean;
}

interface ICountry extends ITimestamps {
  id: number;
  iso2: string;
  iso3: string;
  name: string;
  numeric_code?: string;
  phone_code?: string;
  capital?: string;
  currency?: string;
  currency_name?: string;
  currency_symbol?: string;
  tld?: string;
  native?: string;
  region?: string;
  subregion?: string;
  timezones?: object;
  translations?: object;
  latitude?: number;
  longitude?: number;
  emoji?: string;
  emojiU?: string;
  wiki_data_id?: string;
  provinces?: IProvince[];
  profiles?: IProfile[];
}

interface IProvince extends ITimestamps {
  id: number;
  country_id: number;
  name: string;
  code: string;
  latitude?: number;
  longitude?: number;
}

interface ICity extends ITimestamps {
  id: number;
  country_id: number;
  province_id: number;
  name: string;
  latitude?: number;
  longitude?: number;
}

interface IMedia extends ITimestamps {
  id: number;
  user_id?: number;
  storage?: string;
  name: string;
  type: string;
  url: string;
  path?: string;
  file_size?: string;
  user?: IUser;
}

interface IUser extends ITimestamps {
  id: number;
  email: string;
  username: string;
  full_name: string;
  phone_number?: string;
  verified_email?: boolean;
  type: 0 | 1 | 2;
  status: 0 | 1 | 2;
  profile?: IProfile;
  roles?: IRole[];
  socials?: ISocial[];
}

interface IProfile extends ITimestamps {
  id: number;
  user_id: number;
  avatar_id?: number;
  country_id: number;
  province_id: number;
  city?: string;
  title: string;
  spoken_langs: string[];
  tags: string[];
  about?: string;
  user?: IUser;
  avatar?: IMedia;
  country?: ICountry;
  province?: IProvince;
}

interface ISocial extends ITimestamps {
  id: number;
  user_id: number;
  type: string;
  username: string;
  user?: IUser;
}
