import { Response } from 'express'
import { Builder } from 'selenium-webdriver'
import Services from '../services'
import Validator from '../validators'

async function Execute(req: any, res: Response): Promise<Response> {
  const { path, filename } = req.file
  let imagesGlobalScope = [] as string[]

  try {
    Validator.scriptValidator(path)

    const driver = await new Builder().forBrowser('chrome').build()
    const data = Services.readFile(path)

    const recorder = new Services.Recorder()

    recorder.start(driver)

    for (const command of data) {
      const [commandToRun, params] = command.split('(')

      await Services.runner(
        driver,
        commandToRun,
        Services.cleanParams(params),
        filename
      )
    }

    recorder.stop()

    console.warn('Quitting navigator')
    driver.quit()

    const { images } = recorder

    imagesGlobalScope = images

    const urlResult = await Services.createVideo(images)

    Services.deleteFiles(path, images)

    return res
      .status(200)
      .json({ error: false, message: 'All tests are rounded', urlResult })
  } catch (err: any) {
    Services.deleteFiles(path, imagesGlobalScope)

    console.error(err)
    const { status, message } = err

    return res.status(status || 400).send(message)
  }
}

export default Execute
