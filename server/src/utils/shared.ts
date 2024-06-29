import { DuplicateRowError, UnexpectedError } from './error';

const excludeArrayKey = (array: Array<{ [key: string]: any }>, keyToExclude: string) => {
  return array.map(({ [keyToExclude]: _, ...rest }) => rest);
};

const excludeObjKey = <T extends Record<string, any>>(object: T, keyToExclude: keyof T): Omit<T, typeof keyToExclude> => {
  const { [keyToExclude]: _, ...rest } = object;
  return rest as Omit<T, typeof keyToExclude>;
};
