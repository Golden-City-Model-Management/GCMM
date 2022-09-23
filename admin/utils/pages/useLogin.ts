

import Request from '@/utils/api/request'
import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

interface Response {
  message: string,
  status: string,
  statusCode: number,
  is_logged_in: boolean,
}

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { data, mutate: mutateUser } = useSWR<Response>(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/session`, 
  () => Request({path: '/users/session', method: 'post', }))

  useEffect(() => {
    if (!redirectTo || !data) {
      return
    }
    if (
      (redirectTo && !redirectIfFound && !data?.is_logged_in) ||
      (redirectIfFound && data?.is_logged_in)
    ) {
      Router.push(redirectTo)
    }
  }, [data, redirectIfFound, redirectTo])

  return { is_logged_in: data?.is_logged_in, mutateUser }
}