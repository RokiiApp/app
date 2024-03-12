// @ts-ignore - no types available
import untar from 'js-untar'

export interface TarFile {
	name: string
	mode: string
	uid: number
	gid: number
	size: number
	mtime: number
	checksum: number
	type: string
	linkname: string
	ustarFormat: string
	version?: string
	uname?: string
	gname?: string
	devmajor?: number
	devminor?: number
	namePrefix?: string
	buffer: ArrayBuffer
	blob (): Blob
	getBlobUrl (): URL
	readAsString (): string
	readAsJSON (): any
}

export const untarArrayBuffer = async (tar: ArrayBuffer): Promise<TarFile[]> => {
    const files = await untar(tar)
    return files as TarFile[]
}
