export const stripQuotes = (value: unknown) => {
  if (typeof value !== "string") return value;
  return value.replace(/^"(.*)"$/, "$1");
};
