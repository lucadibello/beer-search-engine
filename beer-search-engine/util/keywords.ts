const getKeywords = (query: string, minLength: number = 3): string[] => {
  // Extract words from query
  const words = query.split(" ")

  // Remove empty words
  const keywords = words.filter(word => word !== "")

  // Remove short words
  const filteredKeywords = keywords.filter(word => word.length >= minLength)

  // Return keywords
  return filteredKeywords
}

export {
  getKeywords
}