// lib/markdown.ts
// Minimal, dependency-free Markdown -> HTML converter.
// Supports headings, bold, italic, inline code, links, images, blockquotes,
// ordered/unordered lists, horizontal rules, fenced code blocks and paragraphs.
// Content from Cosmic markdown metafields is authored by the team, so raw HTML
// in the source is passed through rather than escaped.

function inline(text: string): string {
  return text
    // images before links so the ! form wins
    .replace(
      /!\[([^\]]*)\]\(([^)\s]+)\)/g,
      '<img src="$2" alt="$1" loading="lazy" />'
    )
    .replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      '<a href="$2">$1</a>'
    )
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>')
}

export function markdownToHtml(markdown?: string | null): string {
  if (!markdown) return ''

  const src = String(markdown).replace(/\r\n/g, '\n')
  const lines = src.split('\n')
  const out: string[] = []

  let listType: 'ul' | 'ol' | null = null
  let paragraph: string[] = []
  let inCodeBlock = false
  let codeBuffer: string[] = []
  let inQuote = false
  let quoteBuffer: string[] = []

  const closeParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${inline(paragraph.join(' '))}</p>`)
      paragraph = []
    }
  }

  const closeList = () => {
    if (listType) {
      out.push(`</${listType}>`)
      listType = null
    }
  }

  const closeQuote = () => {
    if (inQuote) {
      out.push(`<blockquote>${inline(quoteBuffer.join(' '))}</blockquote>`)
      quoteBuffer = []
      inQuote = false
    }
  }

  const closeAll = () => {
    closeParagraph()
    closeList()
    closeQuote()
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()

    // fenced code blocks
    if (/^\s*```/.test(line)) {
      if (inCodeBlock) {
        out.push(`<pre><code>${codeBuffer.join('\n')}</code></pre>`)
        codeBuffer = []
        inCodeBlock = false
      } else {
        closeAll()
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeBuffer.push(
        line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      )
      continue
    }

    // blank line ends the current block
    if (!line.trim()) {
      closeAll()
      continue
    }

    // horizontal rule
    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
      closeAll()
      out.push('<hr />')
      continue
    }

    // heading
    const heading = line.match(/^\s*(#{1,6})\s+(.*)$/)
    if (heading) {
      closeAll()
      const level = heading[1].length
      out.push(`<h${level}>${inline(heading[2].trim())}</h${level}>`)
      continue
    }

    // blockquote
    const quote = line.match(/^\s*>\s?(.*)$/)
    if (quote) {
      closeParagraph()
      closeList()
      inQuote = true
      quoteBuffer.push(quote[1])
      continue
    }

    // unordered list item
    const bullet = line.match(/^\s*[-*+]\s+(.*)$/)
    if (bullet) {
      closeParagraph()
      closeQuote()
      if (listType !== 'ul') {
        closeList()
        out.push('<ul>')
        listType = 'ul'
      }
      out.push(`<li>${inline(bullet[1])}</li>`)
      continue
    }

    // ordered list item
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/)
    if (numbered) {
      closeParagraph()
      closeQuote()
      if (listType !== 'ol') {
        closeList()
        out.push('<ol>')
        listType = 'ol'
      }
      out.push(`<li>${inline(numbered[1])}</li>`)
      continue
    }

    // block-level raw HTML passes through untouched
    if (/^\s*<\/?[a-zA-Z][^>]*>/.test(line)) {
      closeAll()
      out.push(line)
      continue
    }

    closeList()
    closeQuote()
    paragraph.push(line.trim())
  }

  if (inCodeBlock && codeBuffer.length) {
    out.push(`<pre><code>${codeBuffer.join('\n')}</code></pre>`)
  }
  closeAll()

  return out.join('\n')
}
