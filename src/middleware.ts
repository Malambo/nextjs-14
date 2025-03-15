import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export const config = {
  matcher: [
    '/login/:path*',
    '/signup/:path*',
  ]
}

export function middleware(request: NextRequest) {
  const cookiesStore = ((cookies() as unknown as UnsafeUnwrappedCookies) as unknown as UnsafeUnwrappedCookies)
  const accessToken = cookiesStore.get('accessToken')?.value
  if(accessToken){
    return NextResponse.redirect(new URL('/store', request.url))
  }
}
 