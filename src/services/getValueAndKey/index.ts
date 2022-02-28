interface getValueAndKeyInterface {
  value: string
  key: string
}

export const getValueAndKey = (param: string): getValueAndKeyInterface => {
  const array = param.split(',')

  const value = array[1]
  const key = array[0]

  return { key, value }
}
