// A list of common stop words to exclude from keywords
// https://www.ranks.nl/stopwords
const stopWords = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "as", "at", "be", "because", "been", "before", "being", "below",
  "between", "both", "but", "by", "could", "did", "do", "does", "doing", "down",
  "during", "each", "few", "for", "from", "further", "had", "has", "have", "having",
  "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i", "if",
  "in", "into", "is", "it", "its", "itself", "me", "more", "most", "my", "myself",
  "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "our", "ours",
  "ourselves", "out", "over", "own", "s", "same", "she", "should", "so", "some", "such",
  "t", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there",
  "these", "they", "this", "those", "through", "to", "too", "under", "until", "up",
  "very", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom",
  "why", "will", "with", "you", "your", "yours", "yourself", "yourselves"
]);

const getKeywords = (query: string, minLength: number = 3): string[] => {
  return query
    .toLowerCase() // Convert to lowercase
    .split(/\W+/) // Split on any non-word character
    .filter(word => word.length >= minLength && !stopWords.has(word)); // Filter out short words and stop words
}

export { getKeywords };