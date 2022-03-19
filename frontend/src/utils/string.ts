export const toPascalCase = (str: string) => {
  return `${str}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w*)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};

export const toTitleCase = (str: string) => {
  return `${str}`
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export const toFirstLetters = (str: string) => {
  return `${str}`
    .split(' ')
    .map((word) => word[0])
    .join('');
};
