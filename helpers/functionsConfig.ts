import { functionsApi } from "./functionsApi";

interface Input<T> {
  expr?: string;
  key: string;
  default: T;
}

interface MyFunction<T, E> {
  name: string;
  prettyName?: string;
  endpoint: <E>(...values: E[]) => string;
  inputs?: Input<T>[];
}

export type MyFunctionDefault = MyFunction<String | Number, string>;

export const functions: MyFunctionDefault[] = [
  {
    name: "gbellmf",
    prettyName: "Колокоподібна функція належності",
    endpoint: functionsApi`/gbellmf`,
    inputs: [
      {
        key: "x",
        default: "0:10",
      },
      {
        key: "a",
        default: 2,
      },
      {
        key: "b",
        default: 4,
      },
      {
        key: "c",
        default: 6,
      },
    ],
  },
];
