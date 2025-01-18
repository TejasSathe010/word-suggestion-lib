import { WordSuggester } from '../src/WordSuggester.js';

describe('WordSuggester', () => {
  const testVocabulary = [
    'hello', 'world', 'help', 'health',
    'javascript', 'python', 'programming'
  ];

  describe('Trie Engine', () => {
    let suggester;

    beforeEach(async () => {
      suggester = new WordSuggester({
        engine: 'trie',
        maxSuggestions: 3,
        minScore: 0.5
      });
      await suggester.initialize(testVocabulary);
    });

    test('should suggest completions', async () => {
      const suggestions = await suggester.suggest('he');
      expect(suggestions).toHaveLength(3);
      expect(suggestions.map(s => s.word)).toContain('hello');
      expect(suggestions.map(s => s.word)).toContain('help');
      expect(suggestions.map(s => s.word)).toContain('health');
    });
  });

  describe('Levenshtein Engine', () => {
    let suggester;

    beforeEach(async () => {
      suggester = new WordSuggester({
        engine: 'levenshtein',
        maxSuggestions: 3,
        minScore: 0.5
      });
      await suggester.initialize(testVocabulary);
    });

    test('should suggest similar words', async () => {
      const suggestions = await suggester.suggest('helt');
      expect(suggestions).toHaveLength(2);
      expect(suggestions[0].word).toBe('help');
      expect(suggestions[1].word).toBe('health');
    });
  });

  describe('Transformer Engine', () => {
    let suggester;

    beforeEach(async () => {
      suggester = new WordSuggester({
        engine: 'transformer',
        maxSuggestions: 3,
        minScore: 0.5,
        enableNextWordPrediction: true
      });
      await suggester.initialize(testVocabulary);
    });

    test('should suggest semantically related words', async () => {
      const suggestions = await suggester.suggest('programming');
      expect(suggestions.length).toBeGreaterThan(0);
      expect(suggestions[0].type).toBe('semantic');
    });

    test('should predict next words', async () => {
      const predictions = await suggester.predictNext('I love');
      expect(predictions.length).toBeGreaterThan(0);
      expect(predictions[0].type).toBe('next');
    });
  });
});