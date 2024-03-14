export type { DirEntry, WatchEvent } from "@tauri-apps/plugin-fs";
import {
    exists,
    readDir,
    writeFile,
    writeTextFile,
    mkdir,
    remove,
    readFile,
    readTextFile,
    watchImmediate
} from "@tauri-apps/plugin-fs";

/**
 * A service to handle file system operations
 */
const FileSystem = {
    exists,
    readDir,
    readBinaryFile: readFile,
    readTextFile,
    writeBinaryFile: writeFile,
    writeTextFile,
    mkdir,
    remove,
    watchImmediate
}

Object.freeze(FileSystem);

export { FileSystem }
