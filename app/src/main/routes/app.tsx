import { memo } from 'react'
import { ResultsList } from '../components/ResultsList'
import { useRunApp } from '../hooks/useRunApp'
import { useInputStore } from '@/stores/InputStore'
import { InputBox } from '@/main/components/InputBox'
import { RokiiLayout } from '../components/RokiiLayout'
import { groupByCustomGroup } from '../utils/groupBy'

const ExtensionApp = () => {
  const term = useInputStore((state) => state.term)

  const { results } = useRunApp(term)

  return <RokiiLayout
    TopBar={<InputBox />}
    ContentContainer={<ResultsList items={results} groupBy={groupByCustomGroup} />}
  />
}

const memoizedExtensionApp = memo(ExtensionApp)

export { memoizedExtensionApp as ExtensionApp }
