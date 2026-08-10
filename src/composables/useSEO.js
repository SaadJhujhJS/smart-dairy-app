import { useHead } from '@unhead/vue'
import { computed, unref } from 'vue'

console.log('useSEO.js loaded - version 2')

// Helper function to recursively unwrap refs and computed properties
function unwrap(val) {
  const unwrapped = unref(val)
  if (unwrapped === null || typeof unwrapped !== 'object') {
    return unwrapped
  }
  if (Array.isArray(unwrapped)) {
    return unwrapped.map(unwrap)
  }
  const result = {}
  for (const key of Object.keys(unwrapped)) {
    result[key] = unwrap(unwrapped[key])
  }
  return result
}

function findCircular(obj, path = '') {
  if (obj === null || typeof obj !== 'object') return
  try {
    JSON.stringify(obj)
  } catch (e) {
    console.warn(`Circular reference found at path: ${path || 'root'}`)
    for (const key of Object.keys(obj)) {
      try {
        findCircular(obj[key], path ? `${path}.${key}` : key)
      } catch (innerErr) {
        console.warn(`Failed checking key ${key}:`, innerErr)
      }
    }
  }
}

export function useSEO(metaOptions) {
  useHead(computed(() => {
    const opts = unwrap(typeof metaOptions === 'function' ? metaOptions() : metaOptions) || {}
    
    const title = opts.title || 'Smart Dairy Store | Pure Honey, Desi Ghee & Khoya'
    const desc = opts.description || 'Premium organic dairy store offering pure small bee honey, big bee honey, grass-fed bilona cow ghee, and fresh khoya. Pure, fresh, and lab-tested.'
    const url = typeof window !== 'undefined' ? window.location.href : 'https://smartdairystore.com'
    const image = opts.image || 'https://smartdairystore.com/og-image.png'
    const type = opts.type || 'website'

    const meta = [
      { name: 'description', content: desc },
      
      // Open Graph / Facebook
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:site_name', content: 'Smart Dairy Store' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: image }
    ]

    const scripts = []
    
    // Inject custom JSON-LD schema
    if (opts.schema) {
      try {
        const json = JSON.stringify(opts.schema)
        scripts.push({
          type: 'application/ld+json',
          children: json
        })
      } catch (e) {
        console.error('Failed to stringify schema in useSEO:', e)
        console.error('Schema object:', opts.schema)
        findCircular(opts.schema)
      }
    }

    return {
      title,
      meta,
      script: scripts
    }
  }))
}
