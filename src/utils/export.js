export function exportToCsv(filename, rows, columns) {
  const columnKeys = columns?.map((c) => c.key) || Object.keys(rows?.[0] || {})
  const header = (columns || columnKeys).map((c) => (typeof c === 'string' ? c : c.label)).join(',')
  const csv = [
    header,
    ...rows.map((row) =>
      columnKeys
        .map((key) => {
          let cell = row[key]
          if (cell === null || cell === undefined) cell = ''
          cell = String(cell).replace(/"/g, '""')
          if (/[",\n]/.test(cell)) cell = '"' + cell + '"'
          return cell
        })
        .join(','),
    ),
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export function printElementAsPdf(elementId, title = 'Export') {
  const element = document.getElementById(elementId)
  if (!element) return
  const printWindow = window.open('', '_blank')
  const html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background: #f7f7f7; }
      </style>
    </head>
    <body>
      <h2>${title}</h2>
      ${element.outerHTML}
      <script>window.onload = () => { window.print(); }<\/script>
    </body>
  </html>`
  printWindow.document.open()
  printWindow.document.write(html)
  printWindow.document.close()
}


