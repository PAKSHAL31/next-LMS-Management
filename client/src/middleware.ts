import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  //console.log("Headers ",req.headers);
  const { sessionClaims } = await auth();
  

  const userId = sessionClaims?.sub || "";
  var user, userRole;
  if(isStudentRoute(req) || isTeacherRoute(req)){
    user = await clerkClient.users.getUser(userId);
    userRole = user.publicMetadata?.userType || "student";
  }
  
  if (isStudentRoute(req)) {
    if (userRole !== "student") {
      const url = new URL("/teacher/courses", req.url);
      return NextResponse.redirect(url);
    }
  }

  if (isTeacherRoute(req)) {
    if (userRole !== "teacher") {
      const url = new URL("/user/courses", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
