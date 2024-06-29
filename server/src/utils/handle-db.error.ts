import { DuplicateRowError, UnexpectedError } from './error';

export const handleDBError = (err: any) => {
  switch (err.code) {
    case '23505': {
      const key = String(err.detail).match(/\(([^)]+)\)/);
      const key_a = key ? key[1] : '';

      throw new DuplicateRowError('Validation Failed', key_a);
    }
    default:
      throw new UnexpectedError(err);
  }
};
