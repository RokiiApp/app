import type { NPMPackageSearchResult, NpmSearchResult } from '../types';

import { decode } from "js-base64"

const sortByPopularity = (a: NPMPackageSearchResult, b: NPMPackageSearchResult) =>
  a.score.detail.popularity > b.score.detail.popularity ? -1 : 1;

/**
 * Get all available plugins for Rokii
 */
export const getNPMPlugins = async () => {
  if (!navigator.onLine) return [];

  /**
   * API endpoint to search all Rokii plugins
  */
  const URL =
    'https://registry.npmjs.com/-/v1/search?from=0&size=500&text=scope:rokii-plugins';

  try {
    const { objects: plugins } = await fetch(URL).then((res) => res.json() as Promise<NpmSearchResult>);
    plugins.sort(sortByPopularity);

    return plugins.map((p) => ({
      name: p.package.name,
      version: p.package.version,
      description: p.package.description,
      homepage: p.package.links.homepage,
      repo: p.package.links.repository
    }));
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * Get plugin Readme.md content
 */
export const getReadme = async (repo: string) => {
  const response = await fetch(`https://api.github.com/repos/${repo}/readme`);
  const json = await response.json();
  return decode(json.content);
};
