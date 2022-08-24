

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

  const method = req.method && req.method.toUpperCase() 

  if(!method || method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const response = await tryCatcher(async (req, _) => {
    const data = await Request({ path: '/users/login', method: 'post', data: req.body})
    return data
  }) 
  const loginData =  await response(req, res) 
  res.status(loginData.statusCode).json({...loginData})
}

