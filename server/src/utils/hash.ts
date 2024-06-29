import { hash, verify } from 'argon2'

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashed = await hash(password);
    return hashed;
  } catch (err) {
    throw new Error('Error hashing password');
  }
};

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  try {
    const isMatch = await verify(hash, password);
    return isMatch;
  } catch (err) {
    throw new Error('Error verifying password');
  }
};
