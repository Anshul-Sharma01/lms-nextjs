import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup";
    const accessToken = request.cookies.get("accessToken")?.value || "";

    // If user has token and visits login/signup, redirect to home
    if (isPublicPath && accessToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Optional: Add protected route logic here if needed in future
    // if (!isPublicPath && !accessToken) { ... }
}

export const config = {
    matcher: [
        "/login",
        "/signup",
        // Add other paths if needed
    ],
};
