// D1 type definitions
export interface D1Database {
  prepare(sql: string): D1PreparedStatement
  exec(sql: string): Promise<D1ExecResult>
}

interface D1PreparedStatement {
  bind(...params: unknown[]): D1PreparedStatement
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>
  first<T = Record<string, unknown>>(): Promise<T | null>
  run(): Promise<D1Response>
}

export interface D1Result<T = unknown> {
  results: T[]
  success: boolean
  meta?: {
    changes?: number
    last_row_id?: number
    duration_after_exec_in_ms?: number
  }
  duration?: number
}

interface D1Response {
  success: boolean
  meta: {
    changes: number
    last_row_id: number
    duration_after_exec_in_ms?: number
  }
  duration?: number
}

interface D1ExecResult {
  success: boolean
  results: D1Result[]
  count: number
  duration: number
}

export interface D1RunResult {
  success: boolean
  meta: {
    changes: number
    last_row_id: number
  }
}

// Type for D1 binding
export type D1Binding = D1Database

/**
 * D1 Database Helper
 * Provides type-safe wrapper around Cloudflare D1 Direct SQL API
 */
export class D1Client {
  constructor(private db: D1Database) {}

  /**
   * Execute a SELECT query and return all results
   */
  async select<T = Record<string, unknown>>(
    sql: string,
    ...params: unknown[]
  ): Promise<T[]> {
    const stmt = this.db.prepare(sql)
    if (params.length > 0) {
      stmt.bind(...params)
    }
    const result = await stmt.all<T>()
    return result.results || []
  }

  /**
   * Execute a SELECT query and return the first result
   */
  async selectFirst<T = Record<string, unknown>>(
    sql: string,
    ...params: unknown[]
  ): Promise<T | null> {
    const stmt = this.db.prepare(sql)
    if (params.length > 0) {
      stmt.bind(...params)
    }
    const result = await stmt.first<T>()
    return result || null
  }

  /**
   * Execute an INSERT, UPDATE, or DELETE query
   */
  async run(
    sql: string,
    ...params: unknown[]
  ): Promise<D1RunResult> {
    const stmt = this.db.prepare(sql)
    if (params.length > 0) {
      stmt.bind(...params)
    }
    const result = await stmt.run()
    return {
      success: result.success,
      meta: {
        changes: result.meta.changes || 0,
        last_row_id: result.meta.last_row_id || 0,
      },
    }
  }

  /**
   * Execute a raw query (for complex operations)
   */
  async execute(sql: string, ...params: unknown[]): Promise<D1Result> {
    const stmt = this.db.prepare(sql)
    if (params.length > 0) {
      stmt.bind(...params)
    }
    return (await stmt.all()) as D1Result
  }
}

/**
 * Create a D1Client from the environment binding
 * Use this in API routes where env.DB is available
 */
export function createD1Client(db: D1Database): D1Client {
  return new D1Client(db)
}

// Helper functions for common operations

/**
 * Get all categories with template and snippet counts
 */
export async function getCategories(db: D1Database): Promise<Record<string, unknown>[]> {
  const client = createD1Client(db)
  return await client.select(`
    SELECT 
      c.*,
      (SELECT COUNT(*) FROM Template WHERE categoryId = c.id) as _count_templates,
      (SELECT COUNT(*) FROM Snippet WHERE categoryId = c.id) as _count_snippets
    FROM Category c
    ORDER BY c.name ASC
  `)
}

/**
 * Get all body parts with template and snippet counts
 */
export async function getBodyParts(db: D1Database): Promise<Record<string, unknown>[]> {
  const client = createD1Client(db)
  return await client.select(`
    SELECT 
      bp.*,
      (SELECT COUNT(*) FROM Template WHERE bodyPartId = bp.id) as _count_templates,
      (SELECT COUNT(*) FROM Snippet WHERE bodyPartId = bp.id) as _count_snippets
    FROM BodyPart bp
    ORDER BY bp.name ASC
  `)
}

/**
 * Get all templates with optional filtering
 */
export async function getTemplates(
  db: D1Database,
  filters: {
    categoryId?: string
    bodyPartId?: string
    modality?: string
    favorites?: boolean
  } = {}
): Promise<Record<string, unknown>[]> {
  const client = createD1Client(db)
  let sql = `
    SELECT 
      t.*,
      c.id as category_id, c.name as category_name, c.description as category_description, 
      c.icon as category_icon, c.color as category_color,
      bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
    FROM Template t
    LEFT JOIN Category c ON t.categoryId = c.id
    LEFT JOIN BodyPart bp ON t.bodyPartId = bp.id
    WHERE 1=1
  `
  const params: unknown[] = []

  if (filters.categoryId) {
    sql += ' AND t.categoryId = ?'
    params.push(filters.categoryId)
  }
  if (filters.bodyPartId) {
    sql += ' AND t.bodyPartId = ?'
    params.push(filters.bodyPartId)
  }
  if (filters.modality) {
    sql += ' AND t.modality = ?'
    params.push(filters.modality)
  }
  if (filters.favorites) {
    sql += ' AND t.isFavorite = 1'
  }

  sql += ' ORDER BY t.usageCount DESC, t.createdAt DESC'

  const results = await client.select<Record<string, unknown>>(sql, ...params)
  
  // Transform results to match expected structure
  return results.map((row) => ({
    ...row,
    category: row.category_id ? {
      id: row.category_id,
      name: row.category_name,
      description: row.category_description,
      icon: row.category_icon,
      color: row.category_color,
    } : null,
    bodyPart: row.bodyPart_id ? {
      id: row.bodyPart_id,
      name: row.bodyPart_name,
      description: row.bodyPart_description,
    } : null,
  }))
}

/**
 * Get a single template by ID
 */
export async function getTemplateById(
  db: D1Database,
  id: string
): Promise<Record<string, unknown> | null> {
  const client = createD1Client(db)
  const result = await client.selectFirst<Record<string, unknown>>(`
    SELECT 
      t.*,
      c.id as category_id, c.name as category_name, c.description as category_description, 
      c.icon as category_icon, c.color as category_color,
      bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
    FROM Template t
    LEFT JOIN Category c ON t.categoryId = c.id
    LEFT JOIN BodyPart bp ON t.bodyPartId = bp.id
    WHERE t.id = ?
  `, id)

  if (!result) return null

  // Increment usage count
  await client.run('UPDATE Template SET usageCount = usageCount + 1 WHERE id = ?', id)

  // Transform result
  return {
    ...result,
    category: result.category_id ? {
      id: result.category_id,
      name: result.category_name,
      description: result.category_description,
      icon: result.category_icon,
      color: result.category_color,
    } : null,
    bodyPart: result.bodyPart_id ? {
      id: result.bodyPart_id,
      name: result.bodyPart_name,
      description: result.bodyPart_description,
    } : null,
  }
}

/**
 * Create a new template
 */
export async function createTemplate(
  db: D1Database,
  data: {
    title: string
    description?: string | null
    content: string
    categoryId?: string | null
    bodyPartId?: string | null
    modality?: string | null
    tags?: string | null
    isFavorite?: boolean
  }
): Promise<Record<string, unknown>> {
  const client = createD1Client(db)
  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  await client.run(`
    INSERT INTO Template (id, title, description, content, categoryId, bodyPartId, modality, tags, isFavorite, usageCount, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
  `, id, data.title, data.description || null, data.content, data.categoryId || null, data.bodyPartId || null, data.modality || null, data.tags || null, data.isFavorite ? 1 : 0, now, now)

  return await getTemplateById(db, id) as Record<string, unknown>
}

/**
 * Update a template
 */
export async function updateTemplate(
  db: D1Database,
  id: string,
  data: {
    title: string
    description?: string | null
    content: string
    categoryId?: string | null
    bodyPartId?: string | null
    modality?: string | null
    tags?: string | null
    isFavorite?: boolean
  }
): Promise<Record<string, unknown>> {
  const client = createD1Client(db)
  const now = new Date().toISOString()

  await client.run(`
    UPDATE Template 
    SET title = ?, description = ?, content = ?, categoryId = ?, bodyPartId = ?, modality = ?, tags = ?, isFavorite = ?, updatedAt = ?
    WHERE id = ?
  `, data.title, data.description || null, data.content, data.categoryId || null, data.bodyPartId || null, data.modality || null, data.tags || null, data.isFavorite ? 1 : 0, now, id)

  return await getTemplateById(db, id) as Record<string, unknown>
}

/**
 * Delete a template
 */
export async function deleteTemplate(db: D1Database, id: string): Promise<boolean> {
  const client = createD1Client(db)
  const result = await client.run('DELETE FROM Template WHERE id = ?', id)
  return result.success && result.meta.changes > 0
}

/**
 * Get all snippets with optional filtering
 */
export async function getSnippets(
  db: D1Database,
  filters: {
    categoryId?: string
    bodyPartId?: string
    modality?: string
    favorites?: boolean
  } = {}
): Promise<Record<string, unknown>[]> {
  const client = createD1Client(db)
  let sql = `
    SELECT 
      s.*,
      c.id as category_id, c.name as category_name, c.description as category_description, 
      c.icon as category_icon, c.color as category_color,
      bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
    FROM Snippet s
    LEFT JOIN Category c ON s.categoryId = c.id
    LEFT JOIN BodyPart bp ON s.bodyPartId = bp.id
    WHERE 1=1
  `
  const params: unknown[] = []

  if (filters.categoryId) {
    sql += ' AND s.categoryId = ?'
    params.push(filters.categoryId)
  }
  if (filters.bodyPartId) {
    sql += ' AND s.bodyPartId = ?'
    params.push(filters.bodyPartId)
  }
  if (filters.modality) {
    sql += ' AND s.modality = ?'
    params.push(filters.modality)
  }
  if (filters.favorites) {
    sql += ' AND s.isFavorite = 1'
  }

  sql += ' ORDER BY s.usageCount DESC, s.createdAt DESC'

  const results = await client.select<Record<string, unknown>>(sql, ...params)
  
  // Transform results to match expected structure
  return results.map((row) => ({
    ...row,
    category: row.category_id ? {
      id: row.category_id,
      name: row.category_name,
      description: row.category_description,
      icon: row.category_icon,
      color: row.category_color,
    } : null,
    bodyPart: row.bodyPart_id ? {
      id: row.bodyPart_id,
      name: row.bodyPart_name,
      description: row.bodyPart_description,
    } : null,
  }))
}

/**
 * Get a single snippet by ID
 */
export async function getSnippetById(
  db: D1Database,
  id: string
): Promise<Record<string, unknown> | null> {
  const client = createD1Client(db)
  const result = await client.selectFirst<Record<string, unknown>>(`
    SELECT 
      s.*,
      c.id as category_id, c.name as category_name, c.description as category_description, 
      c.icon as category_icon, c.color as category_color,
      bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
    FROM Snippet s
    LEFT JOIN Category c ON s.categoryId = c.id
    LEFT JOIN BodyPart bp ON s.bodyPartId = bp.id
    WHERE s.id = ?
  `, id)

  if (!result) return null

  // Increment usage count
  await client.run('UPDATE Snippet SET usageCount = usageCount + 1 WHERE id = ?', id)

  // Transform result
  return {
    ...result,
    category: result.category_id ? {
      id: result.category_id,
      name: result.category_name,
      description: result.category_description,
      icon: result.category_icon,
      color: result.category_color,
    } : null,
    bodyPart: result.bodyPart_id ? {
      id: result.bodyPart_id,
      name: result.bodyPart_name,
      description: result.bodyPart_description,
    } : null,
  }
}

/**
 * Create a new snippet
 */
export async function createSnippet(
  db: D1Database,
  data: {
    title: string
    description?: string | null
    content: string
    categoryId?: string | null
    bodyPartId?: string | null
    modality?: string | null
    tags?: string | null
    isFavorite?: boolean
  }
): Promise<Record<string, unknown>> {
  const client = createD1Client(db)
  const id = crypto.randomUUID()
  const now = new Date().toISOString()

  await client.run(`
    INSERT INTO Snippet (id, title, description, content, categoryId, bodyPartId, modality, tags, isFavorite, usageCount, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
  `, id, data.title, data.description || null, data.content, data.categoryId || null, data.bodyPartId || null, data.modality || null, data.tags || null, data.isFavorite ? 1 : 0, now, now)

  return await getSnippetById(db, id) as Record<string, unknown>
}

/**
 * Update a snippet
 */
export async function updateSnippet(
  db: D1Database,
  id: string,
  data: {
    title: string
    description?: string | null
    content: string
    categoryId?: string | null
    bodyPartId?: string | null
    modality?: string | null
    tags?: string | null
    isFavorite?: boolean
  }
): Promise<Record<string, unknown>> {
  const client = createD1Client(db)
  const now = new Date().toISOString()

  await client.run(`
    UPDATE Snippet 
    SET title = ?, description = ?, content = ?, categoryId = ?, bodyPartId = ?, modality = ?, tags = ?, isFavorite = ?, updatedAt = ?
    WHERE id = ?
  `, data.title, data.description || null, data.content, data.categoryId || null, data.bodyPartId || null, data.modality || null, data.tags || null, data.isFavorite ? 1 : 0, now, id)

  return await getSnippetById(db, id) as Record<string, unknown>
}

/**
 * Delete a snippet
 */
export async function deleteSnippet(db: D1Database, id: string): Promise<boolean> {
  const client = createD1Client(db)
  const result = await client.run('DELETE FROM Snippet WHERE id = ?', id)
  return result.success && result.meta.changes > 0
}

/**
 * Get all templates and snippets for search (without query)
 */
export async function getAllForSearch(
  db: D1Database,
  limit = 50
): Promise<{ templates: Record<string, unknown>[]; snippets: Record<string, unknown>[] }> {
  const client = createD1Client(db)

  const templates = await client.select<Record<string, unknown>>(`
    SELECT 
      t.*,
      c.id as category_id, c.name as category_name, c.description as category_description, 
      c.icon as category_icon, c.color as category_color,
      bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
    FROM Template t
    LEFT JOIN Category c ON t.categoryId = c.id
    LEFT JOIN BodyPart bp ON t.bodyPartId = bp.id
    ORDER BY t.usageCount DESC
    LIMIT ?
  `, limit)

  const snippets = await client.select<Record<string, unknown>>(`
    SELECT 
      s.*,
      c.id as category_id, c.name as category_name, c.description as category_description, 
      c.icon as category_icon, c.color as category_color,
      bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
    FROM Snippet s
    LEFT JOIN Category c ON s.categoryId = c.id
    LEFT JOIN BodyPart bp ON s.bodyPartId = bp.id
    ORDER BY s.usageCount DESC
    LIMIT ?
  `, limit)

  return {
    templates: templates.map((row) => ({
      ...row,
      category: row.category_id ? {
        id: row.category_id,
        name: row.category_name,
        description: row.category_description,
        icon: row.category_icon,
        color: row.category_color,
      } : null,
      bodyPart: row.bodyPart_id ? {
        id: row.bodyPart_id,
        name: row.bodyPart_name,
        description: row.bodyPart_description,
      } : null,
    })),
    snippets: snippets.map((row) => ({
      ...row,
      category: row.category_id ? {
        id: row.category_id,
        name: row.category_name,
        description: row.category_description,
        icon: row.category_icon,
        color: row.category_color,
      } : null,
      bodyPart: row.bodyPart_id ? {
        id: row.bodyPart_id,
        name: row.bodyPart_name,
        description: row.bodyPart_description,
      } : null,
    })),
  }
}
