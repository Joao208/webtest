import { access } from '../access'
import { insert } from '../insert'
import { listenEmail } from '../listenEmail'
import { wait } from '../wait'

export const runner = async (
  driver: Object,
  commandToRun: string,
  params: string,
  filename: string
) => {
  const obj = {
    access,
    insert,
    listenEmail,
    wait,
  } as {
    [key: string]: Function
  }

  await obj[commandToRun](driver, params, filename)
}
