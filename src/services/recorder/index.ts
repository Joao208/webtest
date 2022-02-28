import crypto from 'crypto'

import { WebDriver } from 'selenium-webdriver'
import { upload } from './upload'

export class Recorder {
  images: never[]
  timeout: NodeJS.Timeout
  imagesBase64: never[]

  constructor() {
    this.images = []
    this.timeout = setTimeout(() => {})
    this.imagesBase64 = []
  }

  async start(driver: WebDriver) {
    const base64 = (await driver.takeScreenshot()) as never

    this.imagesBase64.push(base64)

    this.timeout = setTimeout(() => this.start(driver), 33)
  }

  stop() {
    const hash = crypto.randomUUID()
    clearTimeout(this.timeout)

    for (const i in this.imagesBase64) {
      const key = `${hash}_${i}.png`

      const bufferImage = Buffer.from(this.imagesBase64[i], 'base64')

      upload(key, bufferImage)

      this.images.push(`${key}` as never)
    }
  }
}
