import { PLUGINS_PATH } from "@/common/constants/paths"

export const getExtensionNameFromPath = (pluginPath: string) => {
  const pluginInfo = pluginPath.replace(PLUGINS_PATH + "\\", '').split('\\')
  const pluginName = pluginInfo[0]

  return pluginName
}
