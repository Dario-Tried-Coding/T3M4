import { TSchema } from '@/lib/T3M4'
import { DataAttributes } from '@t3m4/next/types'

import 'react'

declare module 'react' {
  interface HTMLAttributes extends DataAttributes.Islands<TSchema>, DataAttributes.Force<TSchema>, DataAttributes.Base<TSchema> {}
}
