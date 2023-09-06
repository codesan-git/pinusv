import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  page: integer("page").notNull(),
});
// Schema for CRUD - used to validate API requests
export const insertBookSchema = createInsertSchema(books);
export const selectBookSchema = createSelectSchema(books);
export const bookIdSchema = selectBookSchema.pick({ id: true });
export const updateBookSchema = selectBookSchema;

export type Books = z.infer<typeof selectBookSchema>;
export type NewBook = z.infer<typeof insertBookSchema>;
export type BookId = z.infer<typeof bookIdSchema>["id"];