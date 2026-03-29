// D1 Database Helper - Migrated from Prisma
// This file now serves as a compatibility layer
// All queries have been migrated to src/lib/d1.ts using Cloudflare D1 Direct SQL API

// Re-export all D1 functions for backward compatibility
export * from './d1'

// Legacy Prisma client export (no longer used)
// The application now uses D1 directly via getCloudflareContext() from @opennextjs/cloudflare
export const db = null
