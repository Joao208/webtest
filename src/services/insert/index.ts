import { Key, WebDriver } from 'selenium-webdriver'

import { getInputByPlaceholder } from '../getInputByPlaceholder'
import { getValueAndKey } from '../getValueAndKey'
import { getEmail } from '../getEmail'
import { cleanText } from '../cleanText'

export const insert = async (
  driver: WebDriver,
  params: string,
  filename: string
): Promise<void> => {
  const { key, value } = getValueAndKey(params)

  let email

  if (cleanText(`${value}`).includes('email')) {
    console.log('Generate new email')

    email = await getEmail(filename)
  }

  const element = await getInputByPlaceholder(driver, key)

  element && (await element.sendKeys(email || cleanText(value), Key.RETURN))
}
