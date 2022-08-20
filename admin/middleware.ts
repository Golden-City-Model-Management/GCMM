// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if(!request.nextUrl.pathname.startsWith('/login') && !request.cookies.get('x-access-token')){
     NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next() 
}
