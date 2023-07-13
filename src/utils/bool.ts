import * as R from "ramda";

export const allTrue = (...args: boolean[]) => {
  return R.pipe(R.reduce(R.and, true), Boolean)(args);
};
