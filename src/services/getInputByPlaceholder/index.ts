import { By, WebDriver, WebElement } from 'selenium-webdriver'

export const getInputByPlaceholder = async (
  driver: WebDriver,
  placeholder: string
): Promise<WebElement | null> => {
  const elements = await driver.findElements(By.tagName('input'))

  let elementFind = null

  for (const element of elements) {
    const elementPlaceholder = await element.getAttribute('placeholder')

    if (elementPlaceholder === placeholder) elementFind = element
  }

  return elementFind
}
