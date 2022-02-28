export const cleanText = (str: string): string => {
  return str ? str.replace(/[^a-zA-Z0-9]/gm, '') : str
}
