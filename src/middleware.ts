import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define route matchers for protected and public routes
const isProtectedRoute = createRouteMatcher(["/organization(.*)"]);
const isPublicRoute = createRouteMatcher(["/"]);

// Define the clerkMiddleware to handle authentication
export default clerkMiddleware((auth, req) => {
  // Redirect authenticated users from public routes to their organization or select-org page
  if (isPublicRoute(req) && auth().userId) {
    let path = "select-org";
    if (auth().orgId) {
      path = `organization/${auth().orgId}`;
    }
    return NextResponse.redirect(new URL(path, req.url));
  }

  // Protect protected routes using Clerk authentication
  if (isProtectedRoute(req)) auth().protect();
});

// Configure the middleware to run on specific routes
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
    "/", // Run middleware on index page
    "/(api|trpc)(.*)", // Run middleware on API routes
  ],
};
