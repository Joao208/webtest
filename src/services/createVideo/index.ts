import { sleep } from '../sleep'
import { getImagesObject } from './getImagesObject'
import { initRecursiveResponse } from './initRecursiveResponse'

const Transloadit = require('transloadit')

const transloadit = new Transloadit({
  authKey: process.env.TRANSLOADIT_KEY,
  authSecret: process.env.TRANSLOADIT_SECRET,
})

export const createVideo = async (imagesArr: string[]) => {
  return new Promise(async (resolve, reject) => {
    await sleep(8000)

    const options = {
      params: {
        steps: {
          ':original': {
            robot: '/upload/handle',
          },
          ...getImagesObject(imagesArr).images,
          resized: {
            use: getImagesObject(imagesArr).use,
            robot: '/image/resize',
            result: true,
            height: 768,
            imagemagick_stack: 'v2.0.7',
            resize_strategy: 'fit',
            width: 1024,
            zoom: false,
          },
          merged: {
            use: {
              steps: [
                { name: ':original', as: 'audio' },
                { name: 'resized', as: 'image' },
              ],
              bundle_steps: true,
            },
            robot: '/video/merge',
            result: true,
            duration: imagesArr.length / 30,
            ffmpeg_stack: 'v4.3.1',
            framerate: '30/1',
            preset: 'ipad-high',
            resize_strategy: 'fit',
          },
          exported: {
            use: ['merged'],
            robot: '/s3/store',
            credentials: 'upload_credential',
          },
        },
      },
    }

    transloadit
      .createAssembly(options)
      .then(async (result: Promise<{ assembly_ssl_url: string }>) => {
        const { assembly_ssl_url } = await result

        return resolve(initRecursiveResponse(assembly_ssl_url))
      })
      .catch((err: Error) => {
        return reject(err)
      })
  })
}
