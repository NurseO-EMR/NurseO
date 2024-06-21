import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { patientRoute } from "./routers/patient";
import { medicationRoute } from "./routers/medication";
import { reportsRoute } from "./routers/reports";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  patient: patientRoute,
  medication: medicationRoute,
  reports: reportsRoute,
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
