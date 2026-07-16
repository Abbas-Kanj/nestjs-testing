import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status', { enum: ['OPEN', 'IN_PROGRESS', 'DONE'] })
    .notNull()
    .default('OPEN'),
});
export type Task = typeof tasks.$inferSelect;
export type TaskStatus = Task['status'];
