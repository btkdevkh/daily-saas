export const stripQuotes = (value: unknown) => {
  if (typeof value !== "string") return value;
  return value.replace(/^"(.*)"$/, "$1");
};

export const parseCSVLine = (line: string, separator = ",") => {
  const regex = new RegExp(`"([^"]*(?:""[^"]*)*)"|([^${separator}]+)`, "g");

  const values = [];
  let match;

  while ((match = regex.exec(line))) {
    values.push(stripQuotes((match[1] ?? match[2] ?? "").replace(/""/g, '"')));
  }

  return values;
};
