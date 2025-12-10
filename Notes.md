# Project Notes

`lib/mongoose.ts`
- In this file i have set up a tiny cache on *globalThis* so that during Next.js hot reloads ( or multiple API calls ), the code reuses a single connection instead of opening a new one each time.
- <mark> bufferCommands : false</mark>  is used so that mongoose won't queue writes if discontinued. 
- The <mark>connectDb()</mark> function returns the cached connection if it exists.