import * as R from "ramda";

export const allTrue = (...args: boolean[]) => {
  return R.pipe(R.reduce(R.and, true), Boolean)(args);
};

export const isNotEqual = (predicate: any, value: any) =>
  R.not(R.equals(predicate, value));
