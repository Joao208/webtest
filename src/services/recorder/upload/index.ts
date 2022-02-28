import s3 from '../../s3'

export const upload = (Key: string, imageBuffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET,
      Key,
      Body: imageBuffer,
      ACL: 'public-read',
    } as AWS.S3.PutObjectRequest

    s3.upload(
      uploadParams,
      function (error: Error, data: { Location: string }) {
        if (error) return reject(error)

        if (data) return resolve(data.Location)
      }
    )
  })
}
