# Project Notes

`lib/mongoose.ts`
- In this file i have set up a tiny cache on *globalThis* so that during Next.js hot reloads ( or multiple API calls ), the code reuses a single connection instead of opening a new one each time.
- <mark> bufferCommands : false</mark>  is used so that mongoose won't queue writes if discontinued. 
- The <mark>connectDb()</mark> function returns the cached connection if it exists.



`lib/utils/cookies.ts`
- In this file I have set the cookiesOptions and different functions for accessToken and refreshToken.
- "lax" : cookie sent on same-site requests and top-level navigations ( ex : clicking a link )
- "strict" : only on same-site requests ( more secure, but can break some flows )
- "none" : always sent ( requires secure : true )
- as const makes Typescript treat it as the literal "lax" ( required by nextjs cookie types, without as const, typescript sees it as string, which can cause type errors. )

- Cookie is avaialable for all paths on my domain as if set to "/api" then it would only be sent to "/api/*" routes

- cookies() is async as it returns Promise (nextjs 15+) and it returns a cookie store object with methods.
- cookies.get() returns {name : string, value : string} | undefined


# Server Actions vs API Routes
| Feature / Use Case | API Routes (`app/api/**`) | Server Actions |
|-------------------|---------------------------|----------------|
| Purpose | Public or reusable backend endpoints | UI-coupled server-side mutations |
| Who can call it | Web app, mobile app, third-party services, Postman | Only your Next.js app |
| How it’s called | `fetch()` / HTTP request | Direct function call from React |
| Authentication | Manual (cookies, headers, tokens) | Automatic (runs on server) |
| Best for | Auth, webhooks, public APIs, mobile support | Forms, button actions, UI mutations |
| Security | Must handle validation & exposure carefully | Safer by default (not publicly accessible) |
| Boilerplate | More (request/response handling) | Less (no HTTP layer) |
| Performance | Slightly slower (HTTP overhead) | Faster (no network hop) |
| Reusability | High (can be used outside Next.js) | Low (UI-specific) |
| Example Use Cases | Login, register, refresh token, Stripe webhook | Update profile, change password, enroll course |



## When to Use API Routes ?
- Authentication (login / register / refresh token)
- Webhooks (Stripe, Razorpay, etc.)
- Public data APIs (course catalog)
- Mobile app backend support
- Anything third-party needs access to


## When to use Server Actions ? 
- Form submissions
- Button mutations (enroll course, mark lesson complete)
- Profile updates
- Change password
- Admin dashboard actions


