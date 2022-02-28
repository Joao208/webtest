import Service from '../services'

export const scriptValidator = (path: string): void => {
  const data = Service.readFile(path)

  const message = 'Error in script, format is invalid, see the documentation'
  const commands = ['access', 'insert', 'listenEmail', 'wait']

  if (!(data && data.length)) throw new Error(message)

  for (const command of data) {
    const [commandToRun, params] = command.split('(')

    if (!commands.includes(commandToRun)) throw new Error(message)

    if (typeof params !== 'string') throw new Error(message)
  }
}
