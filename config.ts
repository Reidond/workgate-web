import { MyFunctionDefault } from "./src/helpers/functionsType";
import { functionsApi } from "./src/helpers/functionsApi";

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
    prettyName: "Узагальнена сигмоїдальна функція належності",
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
  {
    name: "hbmf",
    prettyName: "Гіперболоїдна функція належності",
    endpoint: functionsApi`/${"name"}`,
    inputs: [
      {
        expr: "\\overline{x}",
        key: "x",
        default: "0:10",
      },
      {
        expr: "x^0_j",
        key: "x0",
        default: 2,
      },
      {
        expr: "a_j",
        key: "a",
        default: 4,
      },
    ],
  },
  {
    name: "epmf",
    prettyName: "Еліпсоїдна функція належності",
    endpoint: functionsApi`/${"name"}`,
    inputs: [
      {
        expr: "\\overline{x}",
        key: "x",
        default: "0:10",
      },
      {
        expr: "x^0_j",
        key: "x0",
        default: 2,
      },
      {
        expr: "a_j",
        key: "a",
        default: 4,
      },
    ],
  },
  {
    name: "csmf",
    prettyName: "Конусоподібна функція належності",
    endpoint: functionsApi`/${"name"}`,
    inputs: [
      {
        expr: "\\overline{x}",
        key: "x",
        default: "0:10",
      },
      {
        expr: "x^0_j",
        key: "x0",
        default: 2,
      },
      {
        expr: "h_j",
        key: "h",
        default: 4,
      },
    ],
  },
];
