import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { bookIdSchema, books, BookId } from "@/lib/db/schema/books";

export const getBooks = async () => {
  const c = await db.select().from(books);
  return { books: c };
};

export const getBookById = async (id: BookId) => {
  const { id: bookId } = bookIdSchema.parse({ id });
  const [c] = await db.select().from(books).where(eq(books.id, bookId));

  return { book: c };
};