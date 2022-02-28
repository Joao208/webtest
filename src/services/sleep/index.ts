export const sleep = async (ms: number): Promise<void> => {
  console.log(`sleeping ${ms} ms`)

  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
