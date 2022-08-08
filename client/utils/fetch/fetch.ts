
interface RequestInterface {
  method: string,
  url: string,
  data?: object
}

export default async function RequestHelper(req: RequestInterface) {
  const { method, data, url, } = req

  return await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}