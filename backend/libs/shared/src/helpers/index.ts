export * from './array.helper';
export * from './req.helper';

export const entityPartial = <T>(partial: T, entity: any) => {
  return new entity(partial);
};
