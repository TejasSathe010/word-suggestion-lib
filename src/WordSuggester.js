import { TrieEngine } from './engines/TrieEngine';
import { LevenshteinEngine } from './engines/LevenshteinEngine';
import { TransformerEngine } from './engines/TransformerEngine';

export class WordSuggester {
  /**
   * @param {SuggestionConfig} config
   */
  constructor(config) {
    this.config = {
      maxSuggestions: 5,
      minScore: 0.5,
      enableNextWordPrediction: false,
      ...config
    };

    this.engine = this._initEngine(config.engine);
  }

  _initEngine(engineType) {
    switch (engineType) {
      case 'trie':
        return new TrieEngine();
      case 'levenshtein':
        return new LevenshteinEngine();
      case 'transformer':
        return new TransformerEngine();
      default:
        throw new Error(`Unsupported engine type: ${engineType}`);
    }
  }

  /**
   * Initialize the suggester with a vocabulary
   * @param {string[]} words
   */
  async initialize(words) {
    await this.engine.initialize(words);
  }

  /**
   * Get word suggestions based on input
   * @param {string} input
   * @returns {Promise<SuggestionResult[]>}
   */
  async suggest(input) {
    const suggestions = await this.engine.getSuggestions(input, this.config);
    return suggestions
      .filter(s => s.score >= this.config.minScore)
      .slice(0, this.config.maxSuggestions);
  }

  /**
   * Get next word predictions
   * @param {string} context
   * @returns {Promise<SuggestionResult[]>}
   */
  async predictNext(context) {
    if (!this.config.enableNextWordPrediction) {
      return [];
    }
    return this.engine.predictNext(context, this.config);
  }
}