import { writeFile, readTextFile } from '@tauri-apps/api/fs'

export class PackageJson {
  private readonly path: string

  constructor (path: string) {
    this.path = path
  }

  async overwrite(config: any) {
    const content = JSON.stringify(config, null, 2)
    await writeFile(this.path, content)
  }

  async read<T = Record<string, any>>() {
    const content = await readTextFile(this.path)
    return JSON.parse(content) as T
  }

  async addDependency (name: string, version: string) {
    const config = await this.read()
    config.dependencies = config.dependencies || {}
    config.dependencies[name] = version
    await this.overwrite(config)
  }

  async updateDependency (name: string, version: string) {
    const config = await this.read()
    config.dependencies = config.dependencies || {}
    config.dependencies[name] = version
    await this.overwrite(config)
  }

  async removeDependency (name: string) {
    const config = await this.read()
    config.dependencies = config.dependencies || {}
    delete config.dependencies[name]
    await this.overwrite(config)
  }

  async getDependencies (): Promise<Record<string, string>> {
    const config = await this.read()
    return config.dependencies || {}
  }

  async getDependencyVersion (name: string) {
    const config = await this.read()

    if (!config.dependencies) return undefined

    return config.dependencies[name]
  }
}
