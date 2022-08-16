



import { NextApiResponse, NextApiRequest } from 'next'
import { tryCatcher } from '../../utils/api/async'
import Request from '../../utils/api/request'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
}
  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
 ) {

  console.log('hhelloworelhHHhhHHHHHHHHHHHHHHHHHHHHHHHHHKHIOOOHHHH')
  const method = req.method && req.method.toUpperCase() 

  if(!method || method !== 'GET') return res.status(405).json({ message: 'Method not allowed' })
  console.log(';sdakjfl;aja;];fjkdskkdsjfsfdslka;a;dkf;adkslfkfdsfkdfj') 

  return res.status(200).json({
    email: 'hehr',
    name: 'herlej'
  })

}


