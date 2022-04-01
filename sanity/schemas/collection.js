export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      description: 'Enter the title of the NFT Drop',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      description: 'Enter the description of the NFT Drop',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'adderess',
      description: 'Enter the ETH ADDERESS of the NFT Drop',
      title: 'Adderess',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'creator',
      title: 'Creator',
      type: 'reference',
      to: { type: 'creator' },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'previewImage',
      title: 'Preview image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
