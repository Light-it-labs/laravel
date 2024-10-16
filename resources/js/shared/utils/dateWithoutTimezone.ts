export const dateWithoutTimezone = (input: string) => {
  const date = new Date(input).toISOString();
  const withoutTimezone = date.substring(0, date.length - 1);
  return new Date(withoutTimezone);
};
