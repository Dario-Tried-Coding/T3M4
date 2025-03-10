import { defineCollection, defineConfig } from '@content-collections/core'

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
  }),
})

export default defineConfig({
  collections: [posts],
})