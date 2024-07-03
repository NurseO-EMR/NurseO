import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { getReportSets } from "~/server/database/reportsDB";


export const reportsRouter = createTRPCRouter({
  getReportSets: protectedProcedure.query(async ({ ctx }) => getReportSets(ctx.db)),
  
});
