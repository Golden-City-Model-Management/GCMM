import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import Request from '@/utils/api/request'

interface Response {
  message: string,
  status: string,
  statusCode: 200,
  user: {
    avatar: string,
    email: string,
    name: string,
    role: string,
    userName: string,
    _id: string,
  }
} 
export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<Response>(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`, 
  () => Request({path: '/users/me', method: 'get', }))

  console.log(user)
  useEffect(() => {
    if (!redirectTo || !user?.user) return
    if (
      (redirectTo && !redirectIfFound && !user?.user) ||
      (redirectIfFound && user?.user)
    ) {
      Router.push(redirectTo)
    }
  }, [redirectIfFound, redirectTo, user])

  return { user: user?.user, mutateUser }
}