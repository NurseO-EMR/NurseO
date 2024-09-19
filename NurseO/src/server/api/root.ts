import { patientRouter } from "~/server/api/routers/patient";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { reportsRouter } from "./routers/reports";
import { medicationRouter } from "./routers/medication";
import { settingRouter } from "./routers/settings";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  patient: patientRouter,
  report: reportsRouter,
  medication: medicationRouter,
  setting: settingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
