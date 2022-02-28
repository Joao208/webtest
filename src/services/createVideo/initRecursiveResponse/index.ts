import request, { Response } from 'request'

export const initRecursiveResponse = async (
  endpoint: string
): Promise<String> => {
  return new Promise((resolve, reject) => {
    console.log(`Init recursive response ${endpoint}`)

    return request(endpoint, function (_error: Error, response: Response) {
      const obj = JSON.parse(response.body)
      const url = obj.results?.merged?.[0]?.ssl_url

      if (obj.http_code !== 200) return reject('Error in create video')

      if (!url) return setTimeout(() => initRecursiveResponse(endpoint), 5000)

      console.log(`Finishing ${url}`)

      return resolve(url)
    })
  })
}
