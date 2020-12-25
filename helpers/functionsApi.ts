const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

const createWithHost = (host: string) => (
  strings: TemplateStringsArray,
  ...keys: string[] | number[]
) => <T>(...values: T[]) => {
  const dict = values[values.length - 1] || Object();

  const result = [host, strings[0]];
  keys.forEach((key: string | number, i: number) => {
    const value = Number.isInteger(key) ? values[key as number] : dict[key];
    result.push(value, strings[i + 1]);
  });
  return result.join("");
};

export const functionsApi = createWithHost(`${baseURL}/functions`);
