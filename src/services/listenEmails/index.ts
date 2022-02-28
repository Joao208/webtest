import { cleanDomain } from '../cleanDomain'
import { getValueAndKey } from '../getValueAndKey'
import { sleep } from '../sleep'
import { tempMailIntegration } from '../tempMailIntegration'
import crypto from 'crypto'
import { WebDriver } from 'selenium-webdriver'

export const listenEmails = async (
  driver: WebDriver,
  params: string,
  email: string,
  count: number
): Promise<void> => {
  console.log('Initialling recursive function')

  const emailEncrypted = crypto.createHash('md5').update(email).digest('hex')
  const { data: emails } = await tempMailIntegration(
    `request/mail/id/${emailEncrypted}`
  )

  if (count === 5) return console.log('Function is stopped, email not found')

  if (!emails.length) {
    await sleep(5000)
    return listenEmails(driver, params, email, count + 1)
  }

  for (const email of emails) {
    const { key, value } = getValueAndKey(params)

    const { mail_subject, mail_text } = email

    if (mail_subject.includes(key)) {
      console.log(`Email subject ${mail_subject}`)

      const texts = mail_text.split(' ')

      const link = texts
        .find((text: string) => text.includes(cleanDomain(value)))
        ?.replace(/[^a-zA-Z0-9-.:_\/]/gm, '')
        ?.slice(0, -2)

      return driver.get(link)
    }
  }
}
