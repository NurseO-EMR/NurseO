import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { getCourses, getLocations } from "~/server/database/settingsDB";


export const settingRouter = createTRPCRouter({
  getCourses: protectedProcedure.query(async ({ ctx }) => getCourses(ctx.db)),
  getLocations: protectedProcedure.query(async ({ ctx }) => getLocations(ctx.db)),
  
});
