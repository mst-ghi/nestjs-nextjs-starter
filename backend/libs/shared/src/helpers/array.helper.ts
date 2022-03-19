export function pluck<T, K>(array: T[], key: string): K[] {
  return array.map((a) => a[key]);
}

export function deduplicate<T>(arr: T[]): T[] {
  const result = [];
  if (arr.length > 0) {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (result.indexOf(element) === -1) {
        result.push(element);
      }
    }
  }
  return result;
}
