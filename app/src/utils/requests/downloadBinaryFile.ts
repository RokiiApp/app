export const downloadBinaryFile = async (url: string) => {
    const res = await fetch(url)
    return await res.arrayBuffer()
}
