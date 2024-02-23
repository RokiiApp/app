export const parse = (path: string) => {
    const pathAsUrl = new URL(path)

    const dir = pathAsUrl.pathname.split('/')
    const base = dir.pop() || ''

    return { dir: dir.join('/'), base }
}

/* As we support scoped plugins, using 'base' as plugin name is no longer valid
  because it is not unique. '@example/plugin' and '@test/plugin' would both be treated as 'plugin'
  So now we must introduce the scope to the plugin name
  This function returns the name with the scope if it is present in the path
*/
export const getPluginName = (pluginPath: string) => {
    const { base, dir } = parse(pluginPath)
    const scope = dir.match(/@.+$/)
    if (scope == null) return base
    return `${scope[0]}/${base}`
}
