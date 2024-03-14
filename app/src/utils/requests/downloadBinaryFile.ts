import { fetch } from "@tauri-apps/plugin-http"

export const downloadBinaryFile = async (url: string) => {
    const res = await fetch(url)
    return await res.arrayBuffer()
}
