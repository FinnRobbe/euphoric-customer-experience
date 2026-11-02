import fs from 'node:fs'

const lines = [
  'Placeholder; this would link to the official T&C of the policy',
]

function escapePdfText(s) {
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

const contentParts = ['BT /F1 16 Tf 50 720 Td']
lines.forEach((line, i) => {
  if (i === 0) {
    contentParts.push(`(${escapePdfText(line)}) Tj`)
  } else {
    contentParts.push(`0 -24 Td (${escapePdfText(line)}) Tj`)
  }
})
contentParts.push('ET')
const content = contentParts.join('\n')
const len = Buffer.byteLength(content)

const objs = [
  '1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj',
  '2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj',
  '3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources<< /Font<< /F1 5 0 R >> >> >>endobj',
  `4 0 obj<< /Length ${len} >>stream\n${content}\nendstream\nendobj`,
  '5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj',
]

let pdf = '%PDF-1.4\n'
const offsets = [0]
for (const o of objs) {
  offsets.push(Buffer.byteLength(pdf))
  pdf += `${o}\n`
}
const xrefStart = Buffer.byteLength(pdf)
pdf += `xref\n0 ${objs.length + 1}\n`
pdf += '0000000000 65535 f \n'
for (let i = 1; i <= objs.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`

fs.mkdirSync('public', { recursive: true })
fs.writeFileSync('public/terms.pdf', pdf)
console.log('wrote public/terms.pdf')
