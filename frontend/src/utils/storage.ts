import { parse, stringify } from 'flatted';

interface StorageProps {
  version: string;
  user: IUser;
}

export const storagePrefix = '__app__';

export const isJsonString = (str: string) => {
  try {
    parse(str);
  } catch (e) {
    return false;
  }
  return typeof parse(str);
};

export const setStorage = <T extends keyof StorageProps>(keyName: T, value: StorageProps[T]): void => {
  if (typeof value === 'string') {
    localStorage.setItem(`${storagePrefix}${keyName}`, value);
  }
  localStorage.setItem(`${storagePrefix}${keyName}`, stringify(value));
};

export const getStorage = <T extends keyof StorageProps>(keyName: T): StorageProps[T] | undefined => {
  const storedData = localStorage.getItem(`${storagePrefix}${keyName}`);
  if (storedData) {
    if (isJsonString(storedData)) {
      return parse(storedData) as StorageProps[T];
    }
  }
  return undefined;
};

export const removeStorage = <T extends keyof StorageProps>(keyName: T): void => {
  localStorage.removeItem(`${storagePrefix}${keyName}`);
};
