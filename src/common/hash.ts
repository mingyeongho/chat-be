import * as bcrypt from 'bcrypt';

export const hashing = async ({ text }: { text: string }) => {
  const saltRounds = 10;
  return await bcrypt.hash(text, saltRounds);
};

export const isCompareHashed = async ({
  text,
  hashedPassword,
}: {
  text: string;
  hashedPassword: string;
}) => {
  return await bcrypt.compare(text, hashedPassword);
};
