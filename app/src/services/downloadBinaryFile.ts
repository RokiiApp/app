import { FetchOptions, ResponseType, fetch } from "@tauri-apps/api/http"

const binaryFecthOptions: FetchOptions = {
    method: 'GET',
    responseType: ResponseType.Binary
}

export const downloadBinaryFile = async (url: string): Promise<Iterable<number>> => {
    const { data } = await fetch<Iterable<number>>(url, binaryFecthOptions)
    return data
}
