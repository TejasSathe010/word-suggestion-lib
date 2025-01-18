
# WordSuggester Library

A **powerful and dynamic JavaScript library** for real-time word suggestions, capable of leveraging multiple engines (Trie, Levenshtein Distance, and NLP models). The library dynamically learns and adapts to new words as users type, making it suitable for applications like **EditorJS integration**, auto-complete systems, and intelligent text editors.

## Features

- **Multi-engine Support**: Choose between Trie, Levenshtein, or NLP-based word suggestion.
- **Dynamic Vocabulary**: Automatically learns new words as users type.
- **Real-time Suggestions**: Fetch relevant suggestions dynamically based on the user's input.
- **Configurable Options**: Adjust parameters such as maximum suggestions, minimum match score, and more.
- **EditorJS Integration**: Seamlessly integrates with EditorJS for live typing suggestions.
- **Production-Ready**: Optimized for real-world use cases, including large vocabularies and extensibility.

---

## Installation

### Prerequisites
- Node.js (v14 or above)
- npm or yarn

### Install via npm
```bash
npm install word-suggester
```

---

## Usage

### Basic Setup

```javascript
const WordSuggester = require('word-suggester');

// Initialize the library
const suggester = new WordSuggester({
  engine: 'trie',       // Choose 'trie', 'levenshtein', or 'nlp'
  maxSuggestions: 5,    // Maximum number of suggestions
  minScore: 0.5         // Minimum score for a suggestion (applicable for NLP/Levenshtein)
});

// Initialize with vocabulary
const initialVocabulary = ['hello', 'world', 'javascript', 'python'];
await suggester.initialize(initialVocabulary);

// Get suggestions for a query
const suggestions = suggester.suggest('he');
console.log(suggestions); // Output: ['hello']

// Dynamically add a word
suggester.addWord('hero');
console.log(suggester.suggest('he')); // Output: ['hello', 'hero']
```

---

## Engines

### 1. Trie Engine
- **Best for prefix-based suggestions.**
- Fast and memory-efficient for static vocabularies.

### 2. Levenshtein Distance Engine
- **Best for typo-tolerant and fuzzy matching.**
- Dynamically computes word similarity based on edit distance.

### 3. NLP Engine
- **Best for context-aware suggestions.**
- Uses pretrained NLP models or APIs to fetch relevant suggestions.

---

## Integration with EditorJS

```javascript
import EditorJS from '@editorjs/editorjs';
import WordSuggester from 'word-suggester';

const editor = new EditorJS({
  holder: 'editorjs',
  onChange: async () => {
    const content = await editor.save();
    handleEditorChange(content.blocks);
  },
});

const suggester = new WordSuggester({
  engine: 'trie',
  maxSuggestions: 3,
});

const initialVocabulary = ['hello', 'world', 'javascript', 'python'];
await suggester.initialize(initialVocabulary);

function handleEditorChange(blocks) {
  blocks.forEach(block => {
    const words = block.data.text.split(/\s+/);
    words.forEach(word => suggester.addWord(word));
  });
}

// Get suggestions on user input
const inputField = document.getElementById('word-input');
inputField.addEventListener('input', () => {
  const suggestions = suggester.suggest(inputField.value);
  console.log('Suggestions:', suggestions);
});
```

---

## API Reference

### Constructor
```javascript
new WordSuggester(options)
```
- **`options.engine`**: Choose the engine: `'trie'`, `'levenshtein'`, or `'nlp'`. Default: `'trie'`.
- **`options.maxSuggestions`**: Maximum number of suggestions to return. Default: `5`.
- **`options.minScore`**: Minimum score threshold for suggestions (applicable for Levenshtein/NLP). Default: `0.5`.

### Methods

#### `initialize(vocabulary)`
Initialize the suggester with a list of words.

- **`vocabulary`**: Array of strings representing the initial vocabulary.

#### `suggest(query)`
Fetch suggestions for a given query.

- **`query`**: The prefix or string to search for suggestions.

#### `addWord(word)`
Dynamically add a new word to the vocabulary.

- **`word`**: String to add to the suggestion engine.

---

## Testing

### Install Jest
```bash
npm install --save-dev jest
```

### Example Test Cases

**Trie Engine Test**:
```javascript
const WordSuggester = require('../index');

describe('Trie Engine', () => {
  let suggester;

  beforeEach(async () => {
    suggester = new WordSuggester({ engine: 'trie' });
    await suggester.initialize(['hello', 'world', 'help', 'health']);
  });

  test('should return suggestions for a prefix', () => {
    const suggestions = suggester.suggest('he');
    expect(suggestions).toEqual(['hello', 'help', 'health']);
  });

  test('should dynamically add words', () => {
    suggester.addWord('hero');
    const suggestions = suggester.suggest('he');
    expect(suggestions).toEqual(['hello', 'help', 'health', 'hero']);
  });
});
```

Run tests using:
```bash
npm test
```

---

## Future Improvements

1. **Caching**: Optimize frequently queried suggestions for faster lookups.
2. **Trie Compression**: Implement a Radix Tree for efficient memory usage.
3. **Persistent Vocabulary**: Save and reload vocabulary between sessions.
4. **Advanced NLP**: Integrate transformers or embeddings for better context-aware suggestions.
5. **Hybrid Engine**: Combine Trie and Levenshtein for typo-tolerant prefix suggestions.

---

## Contribution

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request.

---

## License

MIT License
