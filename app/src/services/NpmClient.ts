import { NPM_API_BASE } from '@/common/constants/urls';
import { createDir, removeDir, writeBinaryFile } from '@tauri-apps/api/fs';
import { join, sep } from '@tauri-apps/api/path';
import { http } from '@tauri-apps/api';
import { ResponseType } from '@tauri-apps/api/http';
import untar from "js-untar";
import pako from "pako";
import { PackageJson } from './PackageJson';

/**
 * Lightweight npm client used to install/uninstall package, without resolving dependencies
 */
export class NpmClient {
  private dirPath: string
  private packageJson: PackageJson;

  constructor(dir: string) {
    this.dirPath = dir

    // Initialize package.json
    const packageJsonPath = [dir, 'package.json'].join(sep);
    this.packageJson = new PackageJson(packageJsonPath)
  }

  private async downloadAndExtractPackage(
    tarURL: string,
    destination: string,
    middleware?: () => Promise<any>
  ) {
    console.log(`Extract ${tarURL} to ${destination}`);

    middleware?.()
    const { data } = await http.fetch(tarURL, { method: "GET", responseType: ResponseType.Binary })

    function typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
      return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
    }

    const files = (await untar(typedArrayToBuffer(pako.ungzip(new Uint8Array(data as any))))).map(file => ({ ...file, name: file.name.replace(/^package\//, "") }))

    await createDir(`${destination}\\dist`, { recursive: true })

    for (const file of files) {
      try {
        writeBinaryFile(await join(destination, file.name), file.buffer)
      } catch { }
    }
  }

  /**
   * Install npm package
   */
  async installPackage(
    /**
     * Name of npm package in the registry
     */
    name: string,
    options?: {
      /**
       * Version of npm package. Default is latest version
       */
      version?: string;
      /**
       * Function that returns promise. Called when package's archive is extracted
       * to temp folder, but before moving to real location
       */
      middleware?: () => Promise<any>;
    }
  ) {
    const nameWithoutScope = name.replace(/^@.+?\//, '');
    let versionToInstall;
    const { version, middleware } = options || {};

    console.group('[NpmClient] Install package', name);

    try {
      const resJson = await fetch(`${NPM_API_BASE}${name}`).then((res) => res.json());

      versionToInstall = version || resJson['dist-tags'].latest;
      console.log('Version: ', versionToInstall);

      await this.downloadAndExtractPackage(
        resJson.versions[versionToInstall].dist.tarball,
        await join(this.dirPath, nameWithoutScope),
        middleware
      );

      await this.packageJson.addDependency(name, versionToInstall);
      console.log('Added package to dependencies');

      console.log('Finished installing', name);
    } catch (err) {
      console.log('Error in package installation');
      console.log(err);
    } finally {
      console.groupEnd();
    }
  }

  updatePackage(name: string) {
    // Plugin update is downloading `.tar` and unarchiving it to temp folder
    // Only if this part was succeeded, current version of plugin is uninstalled
    // and temp folder moved to real plugin location
    const middleware = () => this.uninstallPackage(name);
    return this.installPackage(name, { middleware });
  }

  /**
     * Uninstall npm package
     */
  async uninstallPackage(name: string) {
    console.group('[NpmClient] Uninstall package', name);

    try {
      const nameWithoutScope = name.replace(/^@.+?\//, '');
      const modulePath = await join(this.dirPath, nameWithoutScope);

      console.log('(1/2) Remove package directory ', modulePath);
      await removeDir(modulePath, { recursive: true });

      console.log(`(2/2) Remove ${name} from package.json`);
      await this.packageJson.removeDependency(name);

      console.log('Finished uninstalling', name);

      return true;
    } catch (err) {
      console.log('Error in package uninstallation');
      console.log(err);
      return false;
    } finally {
      console.groupEnd();
    }

  }

}
