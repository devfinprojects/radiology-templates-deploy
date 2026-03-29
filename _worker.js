// _worker.js - Working Cloudflare Worker for Next.js
// This version uses a self-contained implementation that doesn't depend on broken imports

const __NODE_ENV__ = "production";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Make D1 binding available globally
    globalThis.cloudflare_env = env;
    
    // Simple routing for API and pages
    try {
      // Handle API routes
      if (url.pathname.startsWith('/api/')) {
        return handleApiRequest(request, env);
      }
      
      // Handle pages - return basic HTML for now
      return new Response(getHtml(url.pathname), {
        headers: { 'Content-Type': 'text/html' }
      });
    } catch (e) {
      return new Response('Error: ' + e.message, { status: 500 });
    }
  },
  
  async scheduled(controller, env, ctx) {
    // Handle scheduled tasks
  },
};

async function handleApiRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Simple D1 query helper
  async function queryDb(sql, ...params) {
    const db = env.DB;
    if (!db) {
      throw new Error('D1 database not bound');
    }
    
    const stmt = db.prepare(sql);
    if (params.length > 0) {
      return stmt.bind(...params).all();
    }
    return stmt.all();
  }
  
  try {
    // Categories endpoint
    if (path === '/api/categories') {
      const result = await queryDb('SELECT * FROM Category ORDER BY name');
      return new Response(JSON.stringify(result.results), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Body parts endpoint
    if (path === '/api/body-parts') {
      const result = await queryDb('SELECT * FROM BodyPart ORDER BY name');
      return new Response(JSON.stringify(result.results), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Templates endpoint
    if (path === '/api/templates') {
      const result = await queryDb(`
        SELECT t.*, c.name as category_name, bp.name as body_part_name 
        FROM Template t 
        LEFT JOIN Category c ON t.category_id = c.id 
        LEFT JOIN BodyPart bp ON t.body_part_id = bp.id
        ORDER BY t.name
      `);
      return new Response(JSON.stringify(result.results), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Single template endpoint
    if (path.match(/^\/api\/templates\/\w+$/)) {
      const id = path.split('/').pop();
      const result = await queryDb('SELECT * FROM Template WHERE id = ?', id);
      if (result.results.length === 0) {
        return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(result.results[0]), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Snippets endpoint
    if (path === '/api/snippets') {
      const result = await queryDb('SELECT * FROM Snippet ORDER BY title');
      return new Response(JSON.stringify(result.results), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Search endpoint
    if (path === '/api/search') {
      const query = url.searchParams.get('q') || '';
      const templates = await queryDb(`
        SELECT * FROM Template 
        WHERE name LIKE ? OR description LIKE ?
        LIMIT 20
      `, `%${query}%`, `%${query}%`);
      
      const snippets = await queryDb(`
        SELECT * FROM Snippet 
        WHERE title LIKE ? OR code LIKE ?
        LIMIT 20
      `, `%${query}%`, `%${query}%`);
      
      return new Response(JSON.stringify({ templates: templates.results, snippets: snippets.results }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

function getHtml(path) {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Radiology Templates</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    h1 { color: #2563eb; }
    .endpoint { background: #f1f5f9; padding: 10px; margin: 5px 0; border-radius: 4px; }
    code { background: #e2e8f0; padding: 2px 6px; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>Radiology Templates API</h1>
  <p>Welcome to the Radiology Templates Cloudflare Worker.</p>
  
  <h2>Available Endpoints:</h2>
  <div class="endpoint"><code>GET /api/categories</code> - List all categories</div>
  <div class="endpoint"><code>GET /api/body-parts</code> - List all body parts</div>
  <div class="endpoint"><code>GET /api/templates</code> - List all templates</div>
  <div class="endpoint"><code>GET /api/templates/:id</code> - Get single template</div>
  <div class="endpoint"><code>GET /api/snippets</code> - List all snippets</div>
  <div class="endpoint"><code>GET /api/search?q=query</code> - Search templates and snippets</div>
</body>
</html>`;
}
