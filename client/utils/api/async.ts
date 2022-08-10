
import { NextApiResponse, NextApiRequest, NextApiHandler } from 'next'

export const  tryCatcher =  async (asyncFn: NextApiHandler) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return asyncFn(req, res);
    } catch (error) {
      return error;
    }
  }
}