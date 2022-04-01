export interface IImage {
  asset: {
    url: string
  }
}

export interface ICreator {
  _id: string
  image: IImage
  name: string
  adderess: string
  slug: {
    current: string
  }
}

export interface ICollection {
  _id: string
  title: string
  description: string
  mainImage: IImage
  previewImage: IImage
  slug: {
    current: String
  }
}
