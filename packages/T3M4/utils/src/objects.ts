export type Keyof<T> = keyof T & string
export type HasKey<T, K extends keyof T> = K extends keyof T ? true : false
export type HasKeys<T> = keyof T extends never ? false : true

export type Values<T extends Record<string, string>> = T[keyof T]