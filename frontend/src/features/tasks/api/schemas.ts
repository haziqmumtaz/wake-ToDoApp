import type { CreateTaskPayload, Task } from '@/types/tasks';
import { z } from 'zod';

// Base task schema
const TaskSchema = z.object({
  text: z
    .string()
    .min(1, 'Task text is required')
    .max(50, 'Task text must not exceed 50 characters')
    .refine(text => text.trim().length > 0, 'Task text cannot be empty')
    .refine(
      // Allow letters, numbers, spaces, basic punctuation
      // Prevent script tags, HTML entities, and dangerous characters
      text => {
        // Check for HTML/script tags
        const htmlTagPattern = /<[^>]+>/;
        if (htmlTagPattern.test(text)) return false;

        // Check for script event handlers
        const scriptPattern = /on\w+\s*=/i;
        if (scriptPattern.test(text)) return false;

        // Check for JavaScript URLs
        const jsUrlPattern = /javascript:/i;
        if (jsUrlPattern.test(text)) return false;

        return true;
      },
      'Text contains potentially unsafe characters'
    )
    .transform(text => text.trim()),
  completed: z.boolean(),
  deleted: z.boolean(),
  createdAt: z.string().datetime(),
  id: z.number().int().positive(),
});

export const CreateTaskSchema: z.ZodType<CreateTaskPayload> = TaskSchema.omit({ id: true });

// Validation helper functions
export const validateCreateTask = (data: unknown): CreateTaskPayload => {
  return CreateTaskSchema.parse(data);
};

export const validateTask = (data: unknown): Task => {
  return TaskSchema.parse(data);
};
