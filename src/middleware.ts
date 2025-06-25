import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Constants for better maintainability
const PROTECTED_ROUTES = ['/dashboard']
const AUTH_ROUTES = ['/login', '/signup']
const PUBLIC_ROUTES = ['/']
const EMAIL_LINK_ERROR = 'Email link is invalid or has expired'

// Helper function to check if path starts with any of the given prefixes
const startsWithAny = (path: string, prefixes: string[]): boolean => 
  prefixes.some(prefix => path.startsWith(prefix))

// Helper function to create redirect response
const createRedirect = (request: NextRequest, pathname: string, searchParams?: Record<string, string>) => {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }
  
  return NextResponse.redirect(url)
}

export async function updateSession(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Early return for static files and Next.js internals
  if (
    startsWithAny(pathname, ['/_next/static', '/_next/image', '/_next/data']) ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Get user authentication status
  // IMPORTANT: DO NOT REMOVE auth.getUser()
  const { data: { user } } = await supabase.auth.getUser()

  // Handle email link errors
  const errorDescription = searchParams.get('error_description')
  if (errorDescription === EMAIL_LINK_ERROR && pathname !== '/signup') {
    return createRedirect(request, '/signup', { error_description: EMAIL_LINK_ERROR })
  }

  // Authentication logic
  const isProtectedRoute = startsWithAny(pathname, PROTECTED_ROUTES)
  const isAuthRoute = AUTH_ROUTES.includes(pathname)
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !user) {
    return createRedirect(request, '/login')
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && user) {
    return createRedirect(request, '/dashboard')
  }

  // Global protection: redirect unauthenticated users to login
  // Allow access to public routes, auth routes, and auth-related paths
  if (
    !user && 
    !isPublicRoute && 
    !isAuthRoute && 
    !startsWithAny(pathname, ['/auth'])
  ) {
    return createRedirect(request, '/login')
  }

  return supabaseResponse
}

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}