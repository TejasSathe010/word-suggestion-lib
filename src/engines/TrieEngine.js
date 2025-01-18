export class TrieEngine {
  constructor() {
    this.root = this._createNode();
  }

  _createNode() {
    return {
      children: new Map(),
      isEndOfWord: false,
    };
  }

  async initialize(words) {
    words.forEach(word => this._insert(word.toLowerCase()));
  }

  _insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, this._createNode());
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
  }

  async getSuggestions(prefix, config) {
    prefix = prefix.toLowerCase();
    let node = this.root;
    
    // Traverse to prefix node
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char);
    }

    const suggestions = [];
    this._findAllWords(node, prefix, suggestions);

    return suggestions.map(word => ({
      word,
      score: this._calculateScore(prefix, word),
      type: 'completion'
    }))
    .filter(sugg => sugg.score >= config.minScore)
    .sort((a, b) => b.score - a.score);
  }

  _findAllWords(node, prefix, suggestions) {
    if (node.isEndOfWord) {
      suggestions.push(prefix);
    }

    for (const [char, childNode] of node.children) {
      this._findAllWords(childNode, prefix + char, suggestions);
    }
  }

  _calculateScore(prefix, word) {
    // Higher score for shorter completions
    const extraChars = word.length - prefix.length;
    return 1 - (extraChars / 10); // Gradually decrease score for longer words
  }

  async predictNext() {
    return []; // Trie doesn't support next word prediction
  }
}
