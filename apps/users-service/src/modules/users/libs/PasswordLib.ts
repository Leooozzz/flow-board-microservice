import bcrypt from "bcrypt";

export const PasswordHash = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const PasswordCompare = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
