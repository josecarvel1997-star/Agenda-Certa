# BarberPro project instructions

- Keep all tenant data scoped through `barbershop_members` and PostgreSQL RLS.
- Never add a Supabase service role key to client code.
- Business writes belong in server actions or database transactions; validate input server-side.
- Keep onboarding resumable and update the setup step only after successful persistence.
- Verify Next.js 16 APIs against the local installed documentation when needed.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
