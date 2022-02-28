export const cleanDomain = (str: string): string => {
  return str.replace(/[^a-zA-Z0-9-.]/gm, '')
}
