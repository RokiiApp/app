import type { Extension, NPMResponse } from '../types'

const sortByPopularity = (a: Extension, b: Extension) => b.score.detail.popularity - a.score.detail.popularity

/**
 * API endpoint to search all Rokii extensions
*/
const EXTENSIONS_API_URL = 'https://registry.npmjs.com/-/v1/search?from=0&size=500&text=scope:rokii-plugins'

/**
 * Get all available plugins for Rokii
 */
export const getNPMPlugins = async () => {
  if (!navigator.onLine) return []

  try {
    const res: NPMResponse = await fetch(EXTENSIONS_API_URL).then((res) => res.json())
    const { objects: extensions } = res

    const sortedExtensions = extensions.toSorted(sortByPopularity)

    return sortedExtensions.map((p) => ({
      name: p.package.name,
      version: p.package.version,
      description: p.package.description,
      homepage: p.package.links.homepage,
      repo: p.package.links.repository
    }))
  } catch (err) {
    console.log(err)
    return []
  }
}


