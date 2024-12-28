# Full Stack RSVP App | Next.js 15, Supabase and Resend - Repository from my YouTube tutorial

## Technologies used

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Resend](https://resend.com)
- [Shadcn](https://ui.shadcn.com/)
  
## Getting started

First, add your ENV's to `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key/api-key
RESEND_API_KEY=your-resend-api-key
EMAIL_TO=email where you'll receive notifications. It needs to be the email you used to create the API key in Resend.
```
Then, install the dependencies:
  
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
