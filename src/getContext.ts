import httpContext from 'express-http-context'

const getContext = (key: string): string => {
  return httpContext.get(key)
}

export default getContext
