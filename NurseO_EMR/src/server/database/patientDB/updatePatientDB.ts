import { type PrismaClient } from "@prisma/client";

export async function updateOrderHoldInfo(db: PrismaClient, orderId: number, holdReason: string | null) {
    const rowEffected = await db.$executeRaw`UPDATE Med_Order SET hold_reason = ${holdReason} WHERE id = ${orderId};`
    return rowEffected > 0
}