import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { getCourses } from "~/server/database/settingsDB";


export const settingRouter = createTRPCRouter({
  getCourses: protectedProcedure.query(async ({ ctx }) => getCourses(ctx.db)),
  
});
