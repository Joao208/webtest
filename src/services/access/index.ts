import { WebDriver } from 'selenium-webdriver'

export const access = async (
  driver: WebDriver,
  params: string
): Promise<void> => {
  console.log(`Accessing ${params}`)

  await driver.get(params)
}
