export type LinientAutoComplete<T extends string> = T | (string & {});
export type IsEmptyArray<T extends readonly unknown[]> = number extends T["length"]
  ? false
  : T["length"] extends 0
    ? true
    : false;
