import { extensionsRepository } from '@/extensions/repo/ExtensionsRespository'
import { ExtensionContextProvider } from '@/services/plugins/ContextProvider'
import { useActionsStore } from '@/stores/actions'
import { useEffect, useMemo } from 'react'
import { useParams } from 'wouter'
import { navigate } from 'wouter/use-hash-location'

export const useRunApp = (input: string) => {
  const [results, removeAllResults] = useActionsStore((s) => [s.actions, s.removeAllActions])

  const { extension: extensionName, app } = useParams<{ extension: string, app: string }>()
  const extension = useMemo(() => extensionsRepository.get(extensionName), [extensionName])

  if (!extension) {
    navigate('/')
    return null
  }

  const appRunner = useMemo(() => extension.getApp(app), [app])

  const context = useMemo(() => {
    return new ExtensionContextProvider(extensionName).get(input)
  }, [input])

  useEffect(() => {
    removeAllResults()
    if (appRunner) {
      appRunner(context)
    }

    return () => {
      removeAllResults()
    }
  }, [input])

  return { results }
}
