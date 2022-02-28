export const formatImageObject = (key: string) => {
  return {
    [key]: {
      robot: '/http/import',
      result: true,
      url: `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    },
  }
}
