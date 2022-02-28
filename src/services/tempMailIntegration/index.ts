const axios = require('axios').default

interface TempMailIntegrationInterface {
  data: any
}

export const tempMailIntegration = async (
  endpoint: string
): Promise<TempMailIntegrationInterface> => {
  const options = {
    method: 'GET',
    url: `https://privatix-temp-mail-v1.p.rapidapi.com/${endpoint}/`,
    headers: {
      'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.TEMP_MAIL_TOKEN,
    },
  }

  return axios
    .request(options)
    .then((response: TempMailIntegrationInterface) => {
      return response
    })
    .catch(() => {
      return { data: {} }
    })
}
