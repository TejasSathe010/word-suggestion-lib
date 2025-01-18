/**
 * @typedef {Object} SuggestionConfig
 * @property {'trie' | 'levenshtein' | 'transformer'} engine - The suggestion engine to use
 * @property {number} maxSuggestions - Maximum number of suggestions to return
 * @property {number} [minScore=0.5] - Minimum similarity score (0-1) for suggestions
 * @property {boolean} [enableNextWordPrediction=false] - Enable next word prediction
 */

/**
 * @typedef {Object} SuggestionResult
 * @property {string} word - The suggested word
 * @property {number} score - Similarity score (0-1)
 * @property {string} [type] - Type of suggestion (completion/similarity/next)
 */