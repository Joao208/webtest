export const cleanParams = (param: string): string => {
  return param.replace(')', '').replace(/'/g, '')
}
