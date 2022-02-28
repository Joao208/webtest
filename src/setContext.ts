import httpContext from 'express-http-context'

const getContext = (key: string, value: string): void => {
  return httpContext.set(key, value)
}

export default getContext
