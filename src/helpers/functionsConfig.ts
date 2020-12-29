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
export type InputDefault = Input<String | Number>;
export interface MyFunctionDefaultStatic
  extends Omit<MyFunctionDefault, "endpoint"> {
  endpoint: string;
  preview: string;
}

export const functions: MyFunctionDefault[] = [
  {
    name: "gbellmf",
    prettyName: "Колокоподібна функція належності",
    endpoint: functionsApi`/${"name"}`,
    inputs: [
      {
        expr: "\\overline{x}",
        key: "x",
        default: "0:10",
      },
      {
        expr: "a_j",
        key: "a",
        default: 2,
      },
      {
        expr: "b_j",
        key: "b",
        default: 4,
      },
      {
        expr: "c",
        key: "c",
        default: 6,
      },
    ],
  },
  {
    name: "gaussmf",
    prettyName: "Гаусова функція належності",
    endpoint: functionsApi`/${"name"}`,
    inputs: [
      {
        expr: "\\overline{x}",
        key: "x",
        default: "0:10",
      },
      {
        expr: "a_j",
        key: "a",
        default: 2,
      },
      {
        expr: "b_j",
        key: "b",
        default: 5,
      },
    ],
  },
  {
    name: "sigmf",
    prettyName: "Узагальнена сигмоїдальна функція належності ",
    endpoint: functionsApi`/${"name"}`,
    inputs: [
      {
        expr: "\\overline{x}",
        key: "x",
        default: "0:10",
      },
      {
        expr: "a_j",
        key: "a",
        default: 2,
      },
      {
        expr: "b_j",
        key: "b",
        default: 4,
      },
    ],
  },
];
