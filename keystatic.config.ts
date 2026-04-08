import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    // 1. Posts Collection (src/content/posts)
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        meta_title: fields.text({ label: 'Meta Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        date: fields.date({ label: 'Date' }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'public/images/posts', 
          publicPath: '/images/posts/',    
        }),
        categories: fields.array(fields.text({ label: 'Category' }), {
          label: 'Categories',
          itemLabel: props => props.value,
        }),
        authors: fields.array(fields.text({ label: 'Author' }), {
          label: 'Authors',
          itemLabel: props => props.value,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: props => props.value,
        }),
        draft: fields.checkbox({ label: 'Draft' }),
        content: fields.markdoc({ 
          label: 'Post Content',
          extension: 'md',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
            },
          },
        }),
      },
    }),

    // 2. Authors Collection (src/content/authors)
    authors: collection({
      label: 'Authors',
      slugField: 'title',
      path: 'src/content/authors/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Author Name' } }),
        meta_title: fields.text({ label: 'Meta Title' }),
        image: fields.image({
          label: 'Author Profile Image',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        description: fields.text({ label: 'Short Description', multiline: true }),
        social: fields.array(
          fields.object({
            name: fields.text({ label: 'Social Network Name (e.g. facebook, twitter)' }),
            icon: fields.text({ label: 'Icon Class (e.g. FaFacebook)' }),
            link: fields.text({ label: 'Profile Link' }),
          }),
          { label: 'Social Links', itemLabel: props => props.fields.name.value }
        ),
        content: fields.markdoc({ 
          label: 'Author Bio / Content',
          extension: 'md',
          options: {
            image: {
              directory: 'public/images/authors',
              publicPath: '/images/authors/',
            },
          },
        }),
      },
    }),
  },
});