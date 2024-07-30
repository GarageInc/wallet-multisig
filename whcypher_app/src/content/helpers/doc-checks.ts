/**
 * Check document element
 * @returns {boolean}
 */
function validDocumentElement() {
  const documentElement: string = document.documentElement.nodeName
  if (documentElement) {
    return documentElement.toLowerCase() === 'html'
  }
  return true
}

/**
 * Check doc type
 * @returns true if it is a valid doctype
 */
function validDocType() {
  const docType: DocumentType | null = window.document.doctype
  if (docType) {
    return docType.name === 'html'
  }
  return true
}

/**
 * Check suffix
 * @returns {boolean} true if it is a good suffix
 */
function validSuffix() {
  const prohibitedTypes: RegExp[] = [/\.xml$/u, /\.pdf$/u]
  const currentUrl: string = window.location.pathname
  for (let i = 0; i < prohibitedTypes.length; i++) {
    if (prohibitedTypes[i].test(currentUrl)) {
      return false
    }
  }
  return true
}

export { validDocType, validDocumentElement, validSuffix }
