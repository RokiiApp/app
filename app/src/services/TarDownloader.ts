import { untarArrayBuffer } from "@/utils/other/untarArrayBuffer";
import { downloadBinaryFile } from "@/utils/requests";
import { ungzip } from 'pako'

const TarDownloader = {
    async download(url: string) {
        const data = await downloadBinaryFile(url);

        const arrayBuffer = this.typedArrayToBuffer(ungzip(data))

        const untarredFiles = await untarArrayBuffer(arrayBuffer)

        return untarredFiles
    },

    typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
    }
}

Object.freeze(TarDownloader);

export { TarDownloader }

