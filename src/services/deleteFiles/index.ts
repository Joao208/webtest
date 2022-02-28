import fs from 'fs'
import s3 from '../s3'

export const deleteFiles = (pathScript: string, images: string[]) => {
  fs.unlink(pathScript, () => {})

  for (const img of images) {
    s3.deleteObject(
      { Bucket: process.env.AWS_BUCKET as string, Key: img },
      (err) => {
        console.error(err)
      }
    )
  }
}
