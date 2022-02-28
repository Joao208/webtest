import { until, WebDriver } from 'selenium-webdriver'
import { getValueAndKey } from '../getValueAndKey'
import { cleanText } from '../cleanText'

export const wait = async (
  driver: WebDriver,
  params: string
): Promise<void> => {
  const { key, value } = getValueAndKey(params)

  console.log(`Waiting ${value}`)

  await driver.wait(until.titleIs(key), parseFloat(cleanText(value)))
}
