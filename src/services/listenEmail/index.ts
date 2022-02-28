import { listenEmails } from '../listenEmails'
import getContext from '../../getContext'
import { WebDriver } from 'selenium-webdriver'

export const listenEmail = async (
  driver: WebDriver,
  params: string
): Promise<void> => {
  await listenEmails(driver, params, getContext('email'), 1)
}
