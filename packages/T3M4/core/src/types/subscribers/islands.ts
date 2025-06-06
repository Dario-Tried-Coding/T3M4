import { Schema } from './schema'

export type Islands<Sc extends Schema> = keyof Schema.Polished<Sc>
export namespace Islands {
  export type Static = string[]
  export namespace Static {
    export type AsSet = Set<string>
  }
}
