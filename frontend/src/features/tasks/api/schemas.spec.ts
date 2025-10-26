import { describe, it, expect } from 'vitest';
import { validateCreateTask, validateTask } from './schemas';

describe('Task Schemas', () => {
  describe('validateCreateTask', () => {
    it('validates a valid task payload', () => {
      const validPayload = {
        text: 'Valid task text',
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
      };

      expect(() => validateCreateTask(validPayload)).not.toThrow();
    });

    it('throws error for empty text', () => {
      const invalidPayload = {
        text: '',
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
      };

      expect(() => validateCreateTask(invalidPayload)).toThrow();
    });

    it('throws error for text exceeding 50 characters', () => {
      const invalidPayload = {
        text: 'a'.repeat(51),
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
      };

      expect(() => validateCreateTask(invalidPayload)).toThrow();
    });

    it('throws error for HTML tags', () => {
      const invalidPayload = {
        text: '<script>alert("xss")</script>',
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
      };

      expect(() => validateCreateTask(invalidPayload)).toThrow();
    });

    it('throws error for JavaScript event handlers', () => {
      const invalidPayload = {
        text: 'Task onclick=alert(1)',
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
      };

      expect(() => validateCreateTask(invalidPayload)).toThrow();
    });

    it('throws error for JavaScript URLs', () => {
      const invalidPayload = {
        text: 'Task javascript:alert(1)',
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
      };

      expect(() => validateCreateTask(invalidPayload)).toThrow();
    });

    it('trims whitespace from text', () => {
      const payload = {
        text: '  Trimmed text  ',
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
      };

      const result = validateCreateTask(payload);
      expect(result.text).toBe('Trimmed text');
    });

    it('rejects whitespace-only text', () => {
      const invalidPayload = {
        text: '   ',
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
      };

      expect(() => validateCreateTask(invalidPayload)).toThrow();
    });
  });

  describe('validateTask', () => {
    it('validates a complete task object', () => {
      const validTask = {
        id: 1,
        text: 'Valid task',
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
      };

      expect(() => validateTask(validTask)).not.toThrow();
    });

    it('throws error for invalid task', () => {
      const invalidTask = {
        id: 'not-a-number',
        text: '',
        completed: false,
        deleted: false,
        createdAt: 'invalid-date',
      };

      expect(() => validateTask(invalidTask)).toThrow();
    });
  });
});
