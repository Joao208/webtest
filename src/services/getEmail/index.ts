import expressContext from 'express-http-context'
import { tempMailIntegration } from '../tempMailIntegration'
import setContext from '../../setContext'

export const getEmail = async (filename: string): Promise<string> => {
  const { data: domains } = await tempMailIntegration('request/domains')

  const domain = domains[Math.floor(Math.random() * domains.length)]
  console.log(`Random domain is ${domain}`)

  const email = filename + domain

  setContext('email', email)
  console.log(`Email is ${email}`)

  return email
}
