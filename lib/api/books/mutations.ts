import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NewBook, insertBookSchema, books, bookIdSchema, BookId } from "@/lib/db/schema/books";

export const createBook = async (book: NewBook) => {
  const newBook = insertBookSchema.parse(book);
  try {
    await db.insert(books).values(newBook)
    return true;
  } catch (err) {
    return { error: (err as Error).message ?? "Error, please try again" };
  }
};

export const updateBook = async (id: BookId, book: NewBook) => {
  const { id: bookId } = bookIdSchema.parse({ id });
  const newBook = insertBookSchema.parse(book);
  try {
    const [c] = await db
     .update(books)
     .set(newBook)
     .where(eq(books.id, bookId!))
     .returning();
    return { book: c };
  } catch (err) {
    return { error: (err as Error).message ?? "Error, please try again" };
  }
};

export const deleteBook = async (id: BookId) => {
  const { id: bookId } = bookIdSchema.parse({ id });
  try {
    const [c] = await db.delete(books).where(eq(books.id, bookId!)).returning();
    return { book: c };
  } catch (err) {
    return { error: (err as Error).message ?? "Error, please try again" };
  }
};