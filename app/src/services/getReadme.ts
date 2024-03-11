import { decode } from 'js-base64'
/**
 * Get plugin Readme.md content
 */
export const getReadme = async (repo: string) => {
    const response = await fetch(`https://api.github.com/repos/${repo}/readme`)
    const json = await response.json()
    return decode(json.content)
  }
