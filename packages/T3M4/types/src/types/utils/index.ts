export type LinientAutoComplete<T extends string> = T | (string & {});
export type IsEmptyArray<T extends any[]> = T extends readonly [] ? true : false;