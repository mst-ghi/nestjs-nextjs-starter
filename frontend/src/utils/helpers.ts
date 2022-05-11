import { InfiniteData } from 'react-query';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getInfinitePagesData = <T>(data: InfiniteData<T[]> | undefined) => {
  const newList: T[] = [];

  if (data && data.pages) {
    data.pages.map((_page) => {
      _page.map((item) => {
        newList.push(item);
        return true;
      });
      return true;
    });
  }

  return newList;
};
