import { createBook } from "@/lib/api/books/mutations";
import { publicProcedure, router } from "../trpc";
import { getBooks } from "@/lib/api/books/queries"
import { z } from 'zod'

export const booksRouter = router({
  getBooks: publicProcedure.query(async () => {
    return getBooks();
  }),
  createBook: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input }) => {
      return createBook({ title: input.title, page: 255 })
    })
});
