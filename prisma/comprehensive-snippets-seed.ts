import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface SnippetData {
  name: string
  category: string
  subcategory: string
  keywords: string
  fullPath: string
}

// Parse the snippet directory file with improved logic
function parseSnippetFile(filePath: string): SnippetData[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const snippets: SnippetData[] = []
  
  let currentCategory = ''
  let pathStack: string[] = []
  let lastSnippetLine = -1
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()
    
    // Skip empty lines
    if (!trimmedLine) continue
    
    // Skip 'text' markers
    if (trimmedLine === 'text') continue
    
    // Skip markdown headers and separators
    if (trimmedLine.startsWith('#') || trimmedLine === '---') continue
    if (trimmedLine.startsWith('```')) continue
    
    // Detect main category headers (with emoji)
    const categoryMatch = trimmedLine.match(/^[🔴🟢🟠🟡🟤🟣🔵⚫⬜🔧🔌♻️💬📋🔄📏📊🌐🧠]\s*(\d+_[A-Za-z_]+)/)
    if (categoryMatch) {
      currentCategory = categoryMatch[1].replace(/_/g, ' ').replace(/^\d+\s*/, '')
      pathStack = [currentCategory]
      continue
    }
    
    // Check for keywords line
    const keywordMatch = trimmedLine.match(/Keywords:\s*(.+)$/i)
    if (keywordMatch && lastSnippetLine >= 0) {
      const keywords = keywordMatch[1].trim()
      const snippetName = pathStack[pathStack.length - 1] || 'Unknown'
      
      snippets.push({
        name: snippetName,
        category: currentCategory,
        subcategory: pathStack.length > 1 ? pathStack[1] : currentCategory,
        keywords: keywords,
        fullPath: pathStack.join(' > ')
      })
      continue
    }
    
    // Parse tree structure lines
    if (line.includes('──')) {
      // Extract the name from tree line
      const treeMatch = line.match(/──\s*([A-Za-z0-9_]+(?:_[A-Za-z0-9_]+)*)\/?\s*$/)
      if (treeMatch) {
        const name = treeMatch[1].replace(/_/g, ' ')
        
        // Calculate depth based on position in line
        const prefixLength = line.indexOf('──')
        const depth = Math.floor(prefixLength / 4)
        
        // Adjust path stack
        if (depth < pathStack.length) {
          pathStack = pathStack.slice(0, depth + 1)
        }
        
        // Add to path stack
        pathStack.push(name)
        lastSnippetLine = i
      }
    }
  }
  
  return snippets
}

// Generate snippet content based on name and keywords
function generateSnippetContent(snippet: SnippetData): string {
  const name = snippet.name
  const keywords = snippet.keywords
  
  // Build meaningful content based on the snippet type
  const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k)
  const mainKeywords = keywordList.slice(0, 5).join(', ')
  
  // Check for specific patterns in the name
  if (name.toLowerCase().includes('normal') || name.toLowerCase().includes('negative')) {
    return `FINDINGS: ${name}.

No abnormality identified. The examination is unremarkable.

Keywords: ${mainKeywords}

IMPRESSION: Normal study. No acute findings.`
  }
  
  if (name.toLowerCase().includes('fracture')) {
    return `FINDINGS: ${name}.

Assessment reveals findings consistent with the stated condition.

Key features: ${mainKeywords}

IMPRESSION: Findings consistent with ${name.toLowerCase()}.`
  }
  
  if (name.toLowerCase().includes('mass') || name.toLowerCase().includes('tumor') || name.toLowerCase().includes('carcinoma')) {
    return `FINDINGS: ${name}.

Evaluation demonstrates the described abnormality.

Characteristics: ${mainKeywords}

IMPRESSION: ${name} as described above. Clinical correlation recommended.`
  }
  
  if (name.toLowerCase().includes('cyst') || name.toLowerCase().includes('lesion')) {
    return `FINDINGS: ${name}.

Imaging findings demonstrate the noted finding.

Features: ${mainKeywords}

IMPRESSION: ${name} identified. Follow-up as clinically indicated.`
  }
  
  if (name.toLowerCase().includes('hemorrhage') || name.toLowerCase().includes('bleed')) {
    return `FINDINGS: ${name}.

Evidence of hemorrhagic component identified.

Characteristics: ${mainKeywords}

IMPRESSION: ${name} present. Urgent clinical correlation advised.`
  }
  
  if (name.toLowerCase().includes('infarct') || name.toLowerCase().includes('ischemia') || name.toLowerCase().includes('stroke')) {
    return `FINDINGS: ${name}.

Ischemic changes identified in the distribution described.

Features: ${mainKeywords}

IMPRESSION: Findings consistent with ${name.toLowerCase()}.`
  }
  
  if (name.toLowerCase().includes('infection') || name.toLowerCase().includes('abscess') || name.toLowerCase().includes('inflammation')) {
    return `FINDINGS: ${name}.

Inflammatory/infectious process identified.

Features: ${mainKeywords}

IMPRESSION: Findings suggestive of ${name.toLowerCase()}. Clinical and laboratory correlation recommended.`
  }
  
  if (name.toLowerCase().includes('stenosis') || name.toLowerCase().includes('occlusion') || name.toLowerCase().includes('obstruction')) {
    return `FINDINGS: ${name}.

Evaluation reveals luminal narrowing as described.

Characteristics: ${mainKeywords}

IMPRESSION: ${name} identified.`
  }
  
  if (name.toLowerCase().includes('tear') || name.toLowerCase().includes('rupture') || name.toLowerCase().includes('injury')) {
    return `FINDINGS: ${name}.

Evidence of traumatic/injury-related changes.

Features: ${mainKeywords}

IMPRESSION: ${name} as described.`
  }
  
  if (name.toLowerCase().includes('grade') || name.toLowerCase().includes('stage') || name.toLowerCase().includes('score')) {
    return `ASSESSMENT: ${name}.

Grading/Staging Criteria: ${mainKeywords}

Notes: Standardized classification applied as per guidelines.`
  }
  
  if (name.toLowerCase().includes('recommend') || name.toLowerCase().includes('follow-up') || name.toLowerCase().includes('suggest')) {
    return `RECOMMENDATION: ${name}.

${mainKeywords}

Note: Follow-up as clinically warranted.`
  }
  
  if (name.toLowerCase().includes('post') && name.toLowerCase().includes('operative')) {
    return `POST-OPERATIVE FINDINGS: ${name}.

Surgical changes noted.

Features: ${mainKeywords}

IMPRESSION: Post-surgical status as described.`
  }
  
  // Default content
  return `FINDINGS: ${name}.

Imaging evaluation demonstrates the described finding.

Key features: ${mainKeywords}

IMPRESSION: ${name} as documented above.`
}

// Map category to body part
function mapCategoryToBodyPart(category: string): string {
  const cat = category.toLowerCase()
  
  if (cat.includes('brain') || cat.includes('cns')) return 'Head/Brain'
  if (cat.includes('head') && cat.includes('neck')) return 'Neck'
  if (cat.includes('spine')) return 'Spine'
  if (cat.includes('chest') || cat.includes('lung')) return 'Chest/Thorax'
  if (cat.includes('cardiac')) return 'Cardiac'
  if (cat.includes('breast')) return 'Breast'
  if (cat.includes('abdomen')) return 'Abdomen'
  if (cat.includes('pelvis')) return 'Pelvis'
  if (cat.includes('msk')) return 'Upper Extremity'
  if (cat.includes('vascular')) return 'Cardiac'
  if (cat.includes('obstetric')) return 'Pelvis'
  if (cat.includes('pediatric')) return 'Whole Body'
  
  return 'Whole Body'
}

// Map category to modality
function mapCategoryToModality(category: string): string {
  const cat = category.toLowerCase()
  
  if (cat.includes('ct ')) return 'CT'
  if (cat.includes('mri')) return 'MRI'
  if (cat.includes('x-ray') || cat.includes('xray')) return 'X-Ray'
  if (cat.includes('ultrasound') || cat.includes('usg')) return 'Ultrasound'
  if (cat.includes('mammogram') || cat.includes('breast')) return 'Mammography'
  if (cat.includes('pet') || cat.includes('nuclear')) return 'Nuclear Medicine'
  
  return 'Multiple'
}

async function main() {
  console.log('Starting comprehensive snippet seed...')
  console.log('=' .repeat(50))
  
  // Read and parse the snippet file
  const snippetFilePath = path.join(process.cwd(), 'upload', 'snippet_directory.txt')
  
  if (!fs.existsSync(snippetFilePath)) {
    console.error('Snippet file not found:', snippetFilePath)
    return
  }
  
  console.log('Parsing snippet file:', snippetFilePath)
  const snippets = parseSnippetFile(snippetFilePath)
  console.log(`Found ${snippets.length} snippets to insert`)
  
  // Show sample snippets
  console.log('\nSample snippets:')
  snippets.slice(0, 3).forEach((s, i) => {
    console.log(`  ${i + 1}. ${s.name} (${s.category})`)
    console.log(`     Keywords: ${s.keywords.substring(0, 60)}...`)
  })
  console.log('  ...')
  
  // Get or create default category and body part
  let defaultCategory = await prisma.category.findFirst({
    where: { name: 'Multiple' }
  })
  
  if (!defaultCategory) {
    defaultCategory = await prisma.category.create({
      data: {
        name: 'Multiple',
        description: 'Multi-modality snippets',
        icon: 'layers',
        color: 'gray'
      }
    })
  }
  
  let defaultBodyPart = await prisma.bodyPart.findFirst({
    where: { name: 'Whole Body' }
  })
  
  if (!defaultBodyPart) {
    defaultBodyPart = await prisma.bodyPart.create({
      data: {
        name: 'Whole Body',
        description: 'General and universal findings'
      }
    })
  }
  
  // Get all body parts for mapping
  const bodyParts = await prisma.bodyPart.findMany()
  const bodyPartMap = new Map(bodyParts.map(b => [b.name, b]))
  
  // Clear existing snippets
  console.log('\nClearing existing snippets...')
  await prisma.snippet.deleteMany({})
  
  // Insert snippets in batches
  const batchSize = 50
  let inserted = 0
  let errors = 0
  
  console.log('\nInserting snippets...')
  console.log('-'.repeat(50))
  
  for (let i = 0; i < snippets.length; i += batchSize) {
    const batch = snippets.slice(i, i + batchSize)
    
    for (const snippet of batch) {
      try {
        const bodyPartName = mapCategoryToBodyPart(snippet.category)
        const bodyPart = bodyPartMap.get(bodyPartName) || defaultBodyPart
        
        await prisma.snippet.create({
          data: {
            title: snippet.name,
            content: generateSnippetContent(snippet),
            categoryId: defaultCategory.id,
            bodyPartId: bodyPart.id,
            modality: mapCategoryToModality(snippet.category),
            tags: snippet.keywords,
            isFavorite: false
          }
        })
        inserted++
        
        if (inserted % 100 === 0) {
          console.log(`  Progress: ${inserted}/${snippets.length} snippets inserted`)
        }
      } catch (error: any) {
        errors++
        if (errors < 10) {
          console.error(`  Error inserting snippet: ${snippet.name}`, error.message)
        }
      }
    }
  }
  
  console.log('-'.repeat(50))
  console.log(`\nInsertion complete!`)
  console.log(`  Successfully inserted: ${inserted}`)
  console.log(`  Errors: ${errors}`)
  
  // Verify counts
  const totalSnippets = await prisma.snippet.count()
  const totalTemplates = await prisma.template.count()
  const totalCategories = await prisma.category.count()
  const totalBodyParts = await prisma.bodyPart.count()
  
  console.log('\n' + '='.repeat(50))
  console.log('DATABASE TOTALS:')
  console.log('='.repeat(50))
  console.log(`  Templates: ${totalTemplates}`)
  console.log(`  Snippets: ${totalSnippets}`)
  console.log(`  Categories: ${totalCategories}`)
  console.log(`  Body Parts: ${totalBodyParts}`)
  console.log('='.repeat(50))
}

main()
  .catch((e) => {
    console.error('Fatal error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
