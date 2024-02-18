export interface PluginInfo {
  name: string
  description: string
  version: string
  installedVersion?: string
  settings?: any
  isInstalled: boolean
  isUpdateAvailable: boolean
  isDebugging?: boolean
  repo?: string
}

export interface NpmPackage {
  name: string
  version: string
  description: string
  links: {
    homepage: string
    repository: string
  }
}

export interface NPMPackageSearchResult {
  package: NpmPackage
  score: {
    final: number
    detail: {
      quality: number
      popularity: number
      maintenance: number
    }
  }
  searchScore: number
}

export interface NpmSearchResult {
  objects: NPMPackageSearchResult[]
}
