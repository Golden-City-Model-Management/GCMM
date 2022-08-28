

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
  const response = await Request({
    path: '/models', 
    method: 'GET',
  })
  if(response.statusCode === 200){
    res.status(200).json(await response)
  }else{
    res.status(response.statusCode).json(await response)
  }
})

const createModel = tryCatcher(async (req, res) => {
  const { body } = req;
  const { name, email, message } = body;
  if(!name || !email || !message) return res.status(400).json({message: 'Please fill all fields'})
  const response = await Request({
    path: '/feedback',
    method: 'POST',
    data: body,
  })
  if(response.statusCode === 201) {
    return res.status(201).json({...response})
  } else {
    return res.status(response.statusCode).json({...response})
  } 
})

const deleteModel = tryCatcher(async (req, res) => {

})

const handlers = (method: string) => {
  switch(method){
    case 'GET': return getAllModels;
    case 'POST': return createModel;
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
  req: NextApiRequest,
  res: NextApiResponse<FeedbackResponse>
 ) {

  const method = req.method && req.method.toUpperCase() 

  if(!method) return res.status(405).json({ message: 'Method not allowed' })

  const handler = (await handlers(method))

  if(!handler) return res.status(405).json({ message: 'Method not allowed' })

  return await handler(req, res)  

}


