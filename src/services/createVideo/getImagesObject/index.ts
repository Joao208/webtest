import { formatImageObject } from '../formatImageObject'

export const getImagesObject = (imagesArr: string[]) => {
  const use = []
  let images = {}

  for (const img of imagesArr) {
    images = { ...images, ...formatImageObject(img) }
    use.push(img)
  }

  return { images, use }
}
