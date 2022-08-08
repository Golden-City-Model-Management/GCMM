

import { NextApiResponse, NextApiRequest } from 'next'
import { tryCatcher } from '../../utils/api/async'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
}
const getAllFeedbacks = tryCatcher(async (req, res) => {

})

const createFeedback = tryCatcher(async (req, res) => {
  const { body } = req;
  const { name, email, message } = body;
  console.log(body)
  return res.status(200).json(JSON.stringify({message: 'thank you for your feedback'}));
})

const deleteFeedback = tryCatcher(async (req, res) => {

})

const handlers = (method: string) => {
  switch(method){
    case 'GET': return getAllFeedbacks;
    case 'POST': return createFeedback;
    case 'DELETE': return deleteFeedback;
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


