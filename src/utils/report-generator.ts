/**
 * Report Generator Utilities
 * Functions for generating and manipulating radiology reports
 */

interface NormalReportOptions {
  indication?: string
  laterality?: string
}

const NORMAL_REPLACEMENTS: Record<string, string> = {
  // Clinical indication
  '[Indication]': 'Routine evaluation',
  '[indication]': 'Routine evaluation',
  // Measurements - normal values
  '[X]': 'within normal limits',
  '[x]': 'within normal limits',
  '[__]': 'normal',
  '[mm]': 'within normal range',
  '[cm]': 'within normal range',
  '[measurement]': 'within normal limits',
  '[value]': 'normal',
  '[number]': 'normal',
  '[size]': 'normal',
  '[dimensions]': 'within normal limits',
  // Laterality
  '[LATERALITY]': '',
  '[SIDE]': '',
  '[Side]': '',
  // Views
  '[VIEWS]': 'standard views',
  // Specific findings
  '[describe]': 'normal',
  '[description]': 'normal findings',
  '[findings]': 'No abnormality detected',
  '[location]': 'as expected',
  '[level]': 'normal',
  '[type]': 'normal',
  '[degree]': 'within normal limits',
  '[severity]': 'none',
  '[assessment]': 'normal',
  '[result]': 'normal',
  '[status]': 'normal',
  '[percentage]': 'within normal range',
  '[degrees]': 'within normal range',
  '[grade]': 'normal',
  '[stage]': 'early',
  // Time-related
  '[time]': 'normal',
  '[minutes]': 'within normal range',
  '[hours]': 'within expected timeframe',
  // Organ-specific normal findings
  '[liver size]': 'normal',
  '[spleen size]': 'normal',
  '[kidney size]': 'normal',
  '[cardiac size]': 'normal',
  '[ventricle size]': 'normal',
  // Generic placeholders
  '[specify]': 'as noted',
  '[note]': '',
  '[comment]': '',
  '[other]': 'none',
  '[additional findings]': 'none',
}

/**
 * Generate a normal report from a template by replacing placeholders
 */
export function generateNormalReport(
  content: string,
  options?: NormalReportOptions
): string {
  let normalContent = content

  // Apply predefined replacements
  Object.entries(NORMAL_REPLACEMENTS).forEach(([placeholder, replacement]) => {
    normalContent = normalContent.split(placeholder).join(replacement)
  })

  // Clean up any remaining bracket placeholders with generic normal values
  normalContent = normalContent.replace(/\[[^\]]+\]/g, (match) => {
    const lowerMatch = match.toLowerCase()
    if (
      lowerMatch.includes('mm') ||
      lowerMatch.includes('cm') ||
      lowerMatch.includes('size')
    ) {
      return 'within normal limits'
    }
    return 'normal'
  })

  // Clean up multiple spaces and lines
  normalContent = normalContent
    .replace(/  +/g, ' ')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim()

  return normalContent
}

/**
 * Check if content contains placeholders
 */
export function hasPlaceholders(content: string): boolean {
  return /\[[^\]]+\]/.test(content)
}

/**
 * Count placeholders in content
 */
export function countPlaceholders(content: string): number {
  const matches = content.match(/\[[^\]]+\]/g)
  return matches ? matches.length : 0
}

/**
 * Extract all placeholders from content
 */
export function extractPlaceholders(content: string): string[] {
  const matches = content.match(/\[[^\]]+\]/g)
  return matches ? Array.from(new Set(matches)) : []
}

/**
 * Get unique placeholder categories from content
 */
export function getPlaceholderCategories(content: string): string[] {
  const placeholders = extractPlaceholders(content)
  const categories = placeholders.map((p) => {
    const inner = p.slice(1, -1).toLowerCase()
    return inner.split(' ')[0] || inner
  })
  return Array.from(new Set(categories))
}
