



import { NextApiResponse, NextApiRequest } from 'next'
import { tryCatcher } from '@/utils/api/async'
import Request from '@/utils/api/request'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
}
const getAllModels = tryCatcher(async (req, res) => {
 const path = req.url?.split('/api') 
  const response = await Request({
    path: path ? path[1] : '/models', 
    method: req.method || 'GET'
  })
  if(response.statusCode === 200){
    res.status(200).json(await response)
  }else{
    res.status(response.statusCode).json(await response)
  }
})

const updateModel = tryCatcher(async (req, res) => {
  const path = req.url?.split('/api') 
  const response = await Request({
    path: path ? path[1] : '/models', 
    method: req.method || 'GET',
    data: req.body,
    headers: {
      'Authorization': `Bearer ${req.cookies['access_token']?.replace(/"/g, '')}`,
    }
  })
  console.log(response)
  if(response.statusCode === 200){
    res.status(200).json(await response)
  }else{
    res.status(response.statusCode).json(await response)
  }
})

const deleteModel = tryCatcher(async (req, res) => {

})

const handlers = (method: string) => {
  switch(method){
    case 'GET': return getAllModels;
    case 'PATCH': return updateModel;
    case 'DELETE': return deleteModel;
    default: return undefined;  
  }
}

interface feedback {
  name: string;
  email: string;
  message: string;
}

interface FeedbackResponse {
  message: string;
  data?: feedback | feedback[]
}

export default async function handler(
  req: NextApiRequest & {[key: string]: any},
  res: NextApiResponse<FeedbackResponse>
 ) {

  const method = req.method && req.method.toUpperCase() 

  if(!method) return res.status(405).json({ message: 'Method not allowed' })

  const handler = (await handlers(method))

  if(!handler) return res.status(405).json({ message: 'Method not allowed' })

  const token = req.cookies['access_token']

  if(!token) return res.status(401).json({message: 'unauthhorized!'})

  return await handler(req, res)  

}


