export type ProtocolStatus = {
    status: string;
    message: string
}

export type Response<T> = Promise<{
    err: string | null
    data: T | null
}>