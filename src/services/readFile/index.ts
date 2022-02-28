import fs from 'fs'

export const readFile = (path: string): String[] =>
  fs
    .readFileSync(path, 'utf8')
    .split('test.')
    .filter((command) => command.length)
