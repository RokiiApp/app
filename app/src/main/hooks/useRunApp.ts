import { extensionsRepository } from '@/extensions/repo/ExtensionsRespository'
import { ExtensionContextProvider } from '@/services/plugins/ContextProvider'
import { useAppResultsStore } from '@/stores/AppResultsStore'
import { useEffect, useMemo } from 'react'
import { navigate } from 'wouter/use-hash-location'
import { useOnAppRun } from './useOnAppRun'
import { useAppParamsInfo } from './useAppParamsInfo'

export const useRunApp = (input: string) => {
  const [results, removeAllResults] = useAppResultsStore((s) => [s.actions, s.removeAllActions])

  const { extensionName, appId } = useAppParamsInfo()

  const extension = useMemo(() => extensionsRepository.get(extensionName), [extensionName])

  if (!extension || !appId) {
    navigate('/')
    return { results: [] }
  }

  const extensionApp = useMemo(() => extension.getApp(appId), [appId])
  
  if (!extensionApp) {
    navigate('/')
    return { results: [] }
  }

  const context = useMemo(() => {
    return new ExtensionContextProvider(extensionName, useAppResultsStore).get(input)
  }, [input])

  const { pendingContext, appOwnContext } = useOnAppRun(extensionApp, context)

  useEffect(() => {
    if (pendingContext) return

    removeAllResults()

    extensionApp.run(context, appOwnContext)

    return () => {
      removeAllResults()
    }
  }, [input, pendingContext])

  return { results }
}
