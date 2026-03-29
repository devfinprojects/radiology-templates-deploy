# Cloudflare Workers Deployment Guide

A comprehensive step-by-step guide for deploying your Radiology Templates Next.js application to Cloudflare Workers using Wrangler CLI.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Authentication Setup](#2-authentication-setup)
3. [wrangler.toml Configuration](#3-wranglertoml-configuration)
4. [Environment Variables Handling](#4-environment-variables-handling)
5. [Building the Worker](#5-building-the-worker)
6. [Deployment Commands](#6-deployment-commands)
7. [Verification & Troubleshooting](#7-verification--troubleshooting)

---

## 1. Prerequisites

### Node.js Requirements

This project uses **Next.js 15** with standalone output. You need:

- **Node.js 20.x LTS** or later (recommended: Node.js 20.x)
- **npm** or **bun** package manager
- Check your Node version:
  ```bash
  node --version
  ```

### Cloudflare Account

1. Go to [cloudflare.com](https://cloudflare.com) and sign up for free
2. Verify your email address
3. Ensure you have access to the Cloudflare dashboard

### Wrangler CLI Installation

Install Wrangler globally via npm:

```bash
npm install -g wrangler
```

Or use npx to run it directly:

```bash
npx wrangler --version
```

Verify installation:

```bash
wrangler --version
```

---

## 2. Authentication Setup

### Option A: Wrangler Login (Interactive)

The easiest method - opens browser for authentication:

```bash
npx wrangler login
```

This command:
1. Opens your default browser
2. Prompts you to log in to Cloudflare
3. Authorizes Wrangler to access your account
4. Stores credentials locally for future commands

### Option B: API Token (Non-Interactive/Automated)

For CI/CD pipelines or automated deployments:

1. **Create API Token**:
   - Go to [Cloudflare Dashboard > Profile > API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Click "Create Custom Token"
   - Configure permissions:
     - **Zone**: Read (for zone-specific resources)
     - **Workers**: Edit (for deployment)
     - **D1**: Edit (for database access)
   - Set expiration date
   - Click "Continue" and copy the token

2. **Set Environment Variables**:
   ```bash
   # Linux/macOS
   export CLOUDFLARE_API_TOKEN="your-token-here"
   export CLOUDFLARE_ACCOUNT_ID="your-account-id"

   # Windows (cmd.exe)
   set CLOUDFLARE_API_TOKEN=your-token-here
   set CLOUDFLARE_ACCOUNT_ID=your-account-id
   ```

3. **Verify Authentication**:
   ```bash
   npx wrangler whoami
   ```

---

## 3. wrangler.toml Configuration

Your project already has a configured `wrangler.toml`. Here's a complete reference:

```toml
# Cloudflare Pages Configuration with Next.js
name = "radiology-templates"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

# Use _worker.js as the entry point for Next.js
main = "./_worker.js"

# Alias to resolve server-only module
[alias]
"server-only" = "./node_modules/server-only"

[build]
# External modules that should not be bundled
[build.upload]
  rules = [{ type = "external", globs = ["server-only"] }]

# D1 database binding
[[d1_databases]]
binding = "DB"
database_name = "radiology-templates"
database_id = "dd9f5a53-9729-4798-b864-993da1ba69fc"

[vars]
NODE_VERSION = "20"
```

### Configuration Options Explained

| Setting | Description | Recommended Value |
|---------|-------------|-------------------|
| `name` | Worker name (must be unique in your account) | `radiology-templates` |
| `compatibility_date` | Runtime compatibility date | Use current date (e.g., `2024-09-23`) |
| `compatibility_flags` | Enable Node.js compatibility | `["nodejs_compat"]` |
| `main` | Worker entry point | `./_worker.js` |
| `d1_databases.binding` | Variable name in code | `DB` |
| `d1_databases.database_name` | D1 database name | `radiology-templates` |
| `d1_databases.database_id` | D1 database ID | Your actual database ID |

### Production-Specific Configuration

Add environment-specific settings:

```toml
# Production environment
[env.production]
name = "radiology-templates-prod"

[[env.production.d1_databases]]
binding = "DB"
database_name = "radiology-templates-prod"
database_id = "your-production-d1-id"

[env.production.vars]
ENVIRONMENT = "production"
DEBUG = "false"
```

---

## 4. Environment Variables Handling

### Using [vars] Section (Non-Sensitive)

For non-sensitive configuration values:

```toml
[vars]
NODE_VERSION = "20"
APP_NAME = "Radiology Templates"
ENVIRONMENT = "production"
```

These are visible in the Cloudflare dashboard and are suitable for public configuration.

### Using .dev.vars for Local Development

Create a `.dev.vars` file in your project root for local development:

```bash
# .dev.vars
DATABASE_URL="file:./prisma/dev.db"
API_SECRET="your-dev-secret"
```

> **Note**: Add `.dev.vars` to your `.gitignore` to prevent committing secrets!

### Using Secrets for Sensitive Values (Production)

For production secrets that should not be committed:

1. **Set a Secret**:
   ```bash
   npx wrangler secret put DATABASE_URL
   # Enter value when prompted (input is hidden for security)
   ```

2. **List Secrets**:
   ```bash
   npx wrangler secret list
   ```

3. **Remove a Secret**:
   ```bash
   npx wrangler secret delete DATABASE_URL
   ```

### Accessing Secrets in Code

Secrets are available as environment variables in your Worker:

```typescript
// In your API routes or utilities
const databaseUrl = process.env.DATABASE_URL;
const apiSecret = process.env.API_SECRET;
```

---

## 5. Building the Worker

### Build Command

This project uses `@cloudflare/next-on-pages` adapter. The build command is already configured:

```bash
npm run build
```

This runs `next-on-pages` which:
1. Builds your Next.js application
2. Generates the `_worker.js` file
3. Optimizes static assets

### Manual Build Steps

If you need more control:

```bash
# Step 1: Install dependencies
npm install

# Step 2: Generate Prisma client
npx prisma generate

# Step 3: Build Next.js with Cloudflare adapter
npx next-on-pages build

# Step 4: Verify output
ls -la .vercel/output/static/
```

### Output Directory

After building, the following key files are generated:

- `_worker.js` - Main Worker entry point
- `.vercel/output/static/` - Static assets

---

## 6. Deployment Commands

### Basic Deployment

Deploy to production:

```bash
npx wrangler deploy
```

### Dry Run (Test Configuration)

Verify configuration without deploying:

```bash
npx wrangler deploy --dry-run
```

This validates:
- wrangler.toml syntax
- D1 bindings
- Environment variables
- Compatibility flags

### Environment-Specific Deployment

Deploy to a specific environment:

```bash
# Deploy to production environment
npx wrangler deploy --env production

# Deploy to staging environment
npx wrangler deploy --env staging
```

### Versioning

Deploy with a specific version comment:

```bash
npx wrangler deploy --message "Release v1.2.0 - Bug fixes"
```

### Full Deployment Examples

```bash
# Full production deploy with output
npx wrangler deploy --verbose

# Deploy with custom environment
npx wrangler deploy --env production --verbose

# Dry run to test everything first
npx wrangler deploy --dry-run --env production
```

---

## 7. Verification & Troubleshooting

### Checking Worker Status

```bash
# List all workers
npx wrangler deployments list

# Get worker details
npx wrangler deployments list --name radiology-templates
```

### Testing the Deployed URL

After deployment, you'll receive a URL like:
`https://radiology-templates.<your-account>.workers.dev`

Test it:

```bash
# Test homepage
curl https://radiology-templates.your-account.workers.dev

# Test an API endpoint
curl https://radiology-templates.your-account.workers.dev/api/categories
```

### Viewing Logs

Monitor real-time logs:

```bash
npx wrangler tail
```

Filter logs:

```bash
# Only show errors
npx wrangler tail --level error

# Filter by specific pattern
npx wrangler tail --format json | grep "ERROR"
```

### Common Errors and Solutions

#### Error: "Failed to publish"

**Cause**: Worker name already exists or insufficient permissions

**Solution**:
```bash
# Check if worker exists
npx wrangler deployments list

# If exists, use --force to overwrite
npx wrangler deploy --force
```

#### Error: "D1 database not found"

**Cause**: Invalid database ID in wrangler.toml

**Solution**:
```bash
# List your D1 databases
npx wrangler d1 list

# Update wrangler.toml with correct database_id
```

#### Error: "nodejs_compat not available"

**Cause**: Compatibility date too old

**Solution**: Update `compatibility_date` in wrangler.toml:
```toml
compatibility_date = "2024-09-23"
```

#### Error: "Module not found: server-only"

**Cause**: Server-only module not properly aliased

**Solution**: Ensure your wrangler.toml has:
```toml
[alias]
"server-only" = "./node_modules/server-only"
```

#### Error: "Prisma client not found"

**Cause**: Prisma not generated for the build

**Solution**:
```bash
npm run postinstall
# Or manually:
npx prisma generate
```

#### Error: "Environment variable not defined"

**Cause**: Missing secret or variable

**Solution**:
```bash
# Check available bindings
npx wrangler deployments list --name radiology-templates

# Verify in Cloudflare Dashboard > Workers > Settings > Variables
```

### Rollback Deployment

If something goes wrong:

```bash
# List deployments to find previous version
npx wrangler deployments list --name radiology-templates

# Rollback to specific deployment
npx wrangler deployments rollback radiology-templates --version <version-id>
```

---

## Quick Reference Commands

```bash
# Setup
npm install -g wrangler
npx wrangler login

# Build
npm run build

# Deploy
npx wrangler deploy

# Verify
npx wrangler tail
curl https://your-worker.workers.dev

# Secrets management
npx wrangler secret put MY_SECRET
npx wrangler secret list
npx wrangler secret delete MY_SECRET
```

---

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [@cloudflare/next-on-pages GitHub](https://github.com/cloudflare/next-on-pages)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [D1 Database Documentation](https://developers.cloudflare.com/d1/)

---

*Last Updated: March 2026*
*Project: Radiology Templates (Next.js 15 + D1)*