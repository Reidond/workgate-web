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
