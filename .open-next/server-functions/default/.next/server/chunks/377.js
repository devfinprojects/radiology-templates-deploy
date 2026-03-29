exports.id=377,exports.ids=[377],exports.modules={2426:(a,b,c)=>{"use strict";c.d(b,{DM:()=>e});let d=Symbol.for("__cloudflare-context__");function e(a={async:!1}){return a.async?g():function(){let a=f();if(a)return a;if(function(){let a=globalThis;return a.__NEXT_DATA__?.nextExport===!0}())throw Error("\n\nERROR: `getCloudflareContext` has been called in sync mode in either a static route or at the top level of a non-static one, both cases are not allowed but can be solved by either:\n  - make sure that the call is not at the top level and that the route is not static\n  - call `getCloudflareContext({async: true})` to use the `async` mode\n  - avoid calling `getCloudflareContext` in the route\n");throw Error(i)}()}function f(){return globalThis[d]}async function g(){let a=f();if(a)return a;{var b;let a=await h();return b=a,globalThis[d]=b,a}}async function h(a){let{getPlatformProxy:b}=await import(`${"__wrangler".replaceAll("_","")}`),c=a?.environment??process.env.NEXT_DEV_WRANGLER_ENV,{env:d,cf:e,ctx:f}=await b({...a,envFiles:[],environment:c});return{env:d,cf:e,ctx:f}}let i='\n\nERROR: `getCloudflareContext` has been called without having called `initOpenNextCloudflareForDev` from the Next.js config file.\nYou should update your Next.js config file as shown below:\n\n   ```\n   // next.config.mjs\n\n   import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";\n\n   initOpenNextCloudflareForDev();\n\n   const nextConfig = { ... };\n   export default nextConfig;\n   ```\n\n'},3172:(a,b,c)=>{"use strict";c.d(b,{I7:()=>l,TA:()=>q,Xj:()=>r,Xu:()=>j,ZS:()=>i,bW:()=>f,dU:()=>e,ht:()=>g,hw:()=>p,k0:()=>o,rz:()=>m,ub:()=>k,wL:()=>n,yv:()=>h});class d{constructor(a){this.db=a}async select(a,...b){let c=this.db.prepare(a);return b.length>0&&c.bind(...b),(await c.all()).results||[]}async selectFirst(a,...b){let c=this.db.prepare(a);return b.length>0&&c.bind(...b),await c.first()||null}async run(a,...b){let c=this.db.prepare(a);b.length>0&&c.bind(...b);let d=await c.run();return{success:d.success,meta:{changes:d.meta.changes||0,last_row_id:d.meta.last_row_id||0}}}async execute(a,...b){let c=this.db.prepare(a);return b.length>0&&c.bind(...b),await c.all()}}function e(a){return new d(a)}async function f(a){let b=e(a);return await b.select(`
    SELECT 
      c.*,
      (SELECT COUNT(*) FROM Template WHERE categoryId = c.id) as _count_templates,
      (SELECT COUNT(*) FROM Snippet WHERE categoryId = c.id) as _count_snippets
    FROM Category c
    ORDER BY c.name ASC
  `)}async function g(a){let b=e(a);return await b.select(`
    SELECT 
      bp.*,
      (SELECT COUNT(*) FROM Template WHERE bodyPartId = bp.id) as _count_templates,
      (SELECT COUNT(*) FROM Snippet WHERE bodyPartId = bp.id) as _count_snippets
    FROM BodyPart bp
    ORDER BY bp.name ASC
  `)}async function h(a,b={}){let c=e(a),d=`
    SELECT 
      t.*,
      c.id as category_id, c.name as category_name, c.description as category_description, 
      c.icon as category_icon, c.color as category_color,
      bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
    FROM Template t
    LEFT JOIN Category c ON t.categoryId = c.id
    LEFT JOIN BodyPart bp ON t.bodyPartId = bp.id
    WHERE 1=1
  `,f=[];return b.categoryId&&(d+=" AND t.categoryId = ?",f.push(b.categoryId)),b.bodyPartId&&(d+=" AND t.bodyPartId = ?",f.push(b.bodyPartId)),b.modality&&(d+=" AND t.modality = ?",f.push(b.modality)),b.favorites&&(d+=" AND t.isFavorite = 1"),d+=" ORDER BY t.usageCount DESC, t.createdAt DESC",(await c.select(d,...f)).map(a=>({...a,category:a.category_id?{id:a.category_id,name:a.category_name,description:a.category_description,icon:a.category_icon,color:a.category_color}:null,bodyPart:a.bodyPart_id?{id:a.bodyPart_id,name:a.bodyPart_name,description:a.bodyPart_description}:null}))}async function i(a,b){let c=e(a),d=await c.selectFirst(`
    SELECT 
      t.*,
      c.id as category_id, c.name as category_name, c.description as category_description, 
      c.icon as category_icon, c.color as category_color,
      bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
    FROM Template t
    LEFT JOIN Category c ON t.categoryId = c.id
    LEFT JOIN BodyPart bp ON t.bodyPartId = bp.id
    WHERE t.id = ?
  `,b);return d?(await c.run("UPDATE Template SET usageCount = usageCount + 1 WHERE id = ?",b),{...d,category:d.category_id?{id:d.category_id,name:d.category_name,description:d.category_description,icon:d.category_icon,color:d.category_color}:null,bodyPart:d.bodyPart_id?{id:d.bodyPart_id,name:d.bodyPart_name,description:d.bodyPart_description}:null}):null}async function j(a,b){let c=e(a),d=crypto.randomUUID(),f=new Date().toISOString();return await c.run(`
    INSERT INTO Template (id, title, description, content, categoryId, bodyPartId, modality, tags, isFavorite, usageCount, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
  `,d,b.title,b.description||null,b.content,b.categoryId||null,b.bodyPartId||null,b.modality||null,b.tags||null,+!!b.isFavorite,f,f),await i(a,d)}async function k(a,b,c){let d=e(a),f=new Date().toISOString();return await d.run(`
    UPDATE Template 
    SET title = ?, description = ?, content = ?, categoryId = ?, bodyPartId = ?, modality = ?, tags = ?, isFavorite = ?, updatedAt = ?
    WHERE id = ?
  `,c.title,c.description||null,c.content,c.categoryId||null,c.bodyPartId||null,c.modality||null,c.tags||null,+!!c.isFavorite,f,b),await i(a,b)}async function l(a,b){let c=e(a),d=await c.run("DELETE FROM Template WHERE id = ?",b);return d.success&&d.meta.changes>0}async function m(a,b={}){let c=e(a),d=`
    SELECT 
      s.*,
      c.id as category_id, c.name as category_name, c.description as category_description, 
      c.icon as category_icon, c.color as category_color,
      bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
    FROM Snippet s
    LEFT JOIN Category c ON s.categoryId = c.id
    LEFT JOIN BodyPart bp ON s.bodyPartId = bp.id
    WHERE 1=1
  `,f=[];return b.categoryId&&(d+=" AND s.categoryId = ?",f.push(b.categoryId)),b.bodyPartId&&(d+=" AND s.bodyPartId = ?",f.push(b.bodyPartId)),b.modality&&(d+=" AND s.modality = ?",f.push(b.modality)),b.favorites&&(d+=" AND s.isFavorite = 1"),d+=" ORDER BY s.usageCount DESC, s.createdAt DESC",(await c.select(d,...f)).map(a=>({...a,category:a.category_id?{id:a.category_id,name:a.category_name,description:a.category_description,icon:a.category_icon,color:a.category_color}:null,bodyPart:a.bodyPart_id?{id:a.bodyPart_id,name:a.bodyPart_name,description:a.bodyPart_description}:null}))}async function n(a,b){let c=e(a),d=await c.selectFirst(`
    SELECT 
      s.*,
      c.id as category_id, c.name as category_name, c.description as category_description, 
      c.icon as category_icon, c.color as category_color,
      bp.id as bodyPart_id, bp.name as bodyPart_name, bp.description as bodyPart_description
    FROM Snippet s
    LEFT JOIN Category c ON s.categoryId = c.id
    LEFT JOIN BodyPart bp ON s.bodyPartId = bp.id
    WHERE s.id = ?
  `,b);return d?(await c.run("UPDATE Snippet SET usageCount = usageCount + 1 WHERE id = ?",b),{...d,category:d.category_id?{id:d.category_id,name:d.category_name,description:d.category_description,icon:d.category_icon,color:d.category_color}:null,bodyPart:d.bodyPart_id?{id:d.bodyPart_id,name:d.bodyPart_name,description:d.bodyPart_description}:null}):null}async function o(a,b){let c=e(a),d=crypto.randomUUID(),f=new Date().toISOString();return await c.run(`
    INSERT INTO Snippet (id, title, description, content, categoryId, bodyPartId, modality, tags, isFavorite, usageCount, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
  `,d,b.title,b.description||null,b.content,b.categoryId||null,b.bodyPartId||null,b.modality||null,b.tags||null,+!!b.isFavorite,f,f),await n(a,d)}async function p(a,b,c){let d=e(a),f=new Date().toISOString();return await d.run(`
    UPDATE Snippet 
    SET title = ?, description = ?, content = ?, categoryId = ?, bodyPartId = ?, modality = ?, tags = ?, isFavorite = ?, updatedAt = ?
    WHERE id = ?
  `,c.title,c.description||null,c.content,c.categoryId||null,c.bodyPartId||null,c.modality||null,c.tags||null,+!!c.isFavorite,f,b),await n(a,b)}async function q(a,b){let c=e(a),d=await c.run("DELETE FROM Snippet WHERE id = ?",b);return d.success&&d.meta.changes>0}async function r(a,b=50){let c=e(a),d=await c.select(`
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
  `,b),f=await c.select(`
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
  `,b);return{templates:d.map(a=>({...a,category:a.category_id?{id:a.category_id,name:a.category_name,description:a.category_description,icon:a.category_icon,color:a.category_color}:null,bodyPart:a.bodyPart_id?{id:a.bodyPart_id,name:a.bodyPart_name,description:a.bodyPart_description}:null})),snippets:f.map(a=>({...a,category:a.category_id?{id:a.category_id,name:a.category_name,description:a.category_description,icon:a.category_icon,color:a.category_color}:null,bodyPart:a.bodyPart_id?{id:a.bodyPart_id,name:a.bodyPart_name,description:a.bodyPart_description}:null}))}}},6487:()=>{},8335:()=>{}};