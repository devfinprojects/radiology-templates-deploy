# Cloudflare Deployment Guide

## Important Notes

This application uses SQLite with Prisma, which requires a Node.js runtime. Cloudflare Pages uses Edge Runtime which is not compatible with Prisma + SQLite directly.

## Options for Cloudflare Deployment

### Option 1: Use Cloudflare Workers (Recommended for Node.js apps)

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Create a D1 database:
   ```bash
   wrangler d1 create radiology-templates
   ```

4. Update `wrangler.toml` with your database ID

5. Modify `src/lib/db.ts` to use D1:
   ```typescript
   // For Cloudflare D1
   import { PrismaClient } from '@prisma/client'
   
   export const db = new PrismaClient({
     datasourceUrl: process.env.DATABASE_URL,
   })
   ```

6. Update Prisma schema for D1:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

### Option 2: Deploy to Cloudflare Pages with External Database

Use an external database service that's compatible with Prisma:
- **Turso** (LibSQL - SQLite compatible)
- **PlanetScale** (MySQL compatible)
- **Neon** (PostgreSQL)
- **Supabase** (PostgreSQL)

1. Create account on your chosen database provider
2. Get connection string
3. Update `.env` with the new connection string
4. Update Prisma schema if needed
5. Deploy using Cloudflare Pages

### Option 3: Use Cloudflare Workers with better-sqlite3

For smaller datasets, you can use Cloudflare D1 directly with prepared statements instead of Prisma.

## Alternative: Vercel Deployment (Easiest)

This application works out-of-the-box with Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Deploy

No configuration needed - SQLite will work in Vercel's serverless functions.

## Alternative: Docker Deployment

1. Build and run with Docker:
   ```bash
   docker build -t radiology-templates .
   docker run -p 3000:3000 radiology-templates
   ```

2. Or use Docker Compose:
   ```yaml
   version: '3'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       volumes:
         - ./db:/app/db
   ```
