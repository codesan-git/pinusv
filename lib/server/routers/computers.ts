import { createComputer } from "@/lib/api/computers/mutations";
import { publicProcedure, router } from "../trpc";
import { getComputers } from "@/lib/api/computers/queries"
import { z } from 'zod'

export const computersRouter = router({
  getComputers: publicProcedure.query(async () => {
    return getComputers();
  }),
  createComputer: publicProcedure
    .input(z.object({ brand: z.string() }))
    .mutation(async ({ input }) => {
      return createComputer({ brand: input.brand, cores: 5 })
    })
});
