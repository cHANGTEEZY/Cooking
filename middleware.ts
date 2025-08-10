import { auth, clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const { pathname } = req.nextUrl;

  // Protect API routes that require authentication
  if (pathname.startsWith("/api/")) {
    // Allow public API routes (like webhooks, public endpoints)
    const publicApiRoutes = [
      "/api/webhooks", // Add any webhook routes
    ];

    const isPublicApiRoute = publicApiRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (!isPublicApiRoute && !userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // For protected pages, redirect to sign-in if not authenticated
  const clientProtectedRoutes = ["/dashboard"];
  const serverProtectedRoutes = ["/api/users"];

  const clientProtectedRoute = clientProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const serverProtectedRoute = serverProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (clientProtectedRoute && !userId) {
    const signInUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signInUrl);
  }

  if (serverProtectedRoute && !userId) {
    const signInUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
