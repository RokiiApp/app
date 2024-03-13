import { untarArrayBuffer } from "@/utils/other/untarArrayBuffer";
import { downloadBinaryFile } from "@/utils/requests/downloadBinaryFile";
import { ungzip } from 'pako'

const TarDownloader = {
    async download(url: string) {
        const data = await downloadBinaryFile(url);

        // Ensure the downloaded data is a Uint8Array
        const binary = new Uint8Array(data)

        const arrayBuffer = this.typedArrayToBuffer(ungzip(binary))

        const untarredFiles = await untarArrayBuffer(arrayBuffer)

        return untarredFiles
    },

    typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
    }
}

Object.freeze(TarDownloader);

export { TarDownloader }

