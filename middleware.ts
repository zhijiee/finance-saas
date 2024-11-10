// import { clerkMiddleware } from "@clerk/nextjs/server";
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
// export default clerkMiddleware();
const isPublicRoute = createRouteMatcher([
  // "/sign-in(.*)", "/sign-up(.*)"
  "/",
]);

const isProtectedRoute = createRouteMatcher(["/"]);
export default clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) {
      await auth.protect()
    }
    return NextResponse.next()
  })

// export default clerkMiddleware(async (auth, request) => {
//     if (!isPublicRoute(request)) {
//       await auth.protect()
//     }
//   })
  
  export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };