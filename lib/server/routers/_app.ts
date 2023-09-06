import { computersRouter } from "./computers";
import { booksRouter } from "./books";
import { router } from "../trpc";

export const appRouter = router({
  computers: computersRouter,
  books: booksRouter
});

export type AppRouter = typeof appRouter;
