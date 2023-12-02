const getKeywords = (query: string, minLength: number = 3): string[] => {
  // Extract words from query
  const words = query.split(" ")

  // Remove empty words
  const keywords = words.filter(word => word !== "")

  // Remove short words
  const filteredKeywords = keywords.filter(word => word.length >= minLength)

  // Remove special characters from keywords
  filteredKeywords.forEach((keyword, index) => {
    filteredKeywords[index] = keyword.replace(/[^a-zA-Z0-9]/g, "")
  })

  // Return keywords
  return filteredKeywords
}

export {
  getKeywords
}