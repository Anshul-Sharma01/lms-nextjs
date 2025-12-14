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