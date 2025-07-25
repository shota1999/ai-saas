export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/generator/:path*",
    "/billing/:path*",
    "/history/:path*",
    "/profile/:path*"
  ],
};
