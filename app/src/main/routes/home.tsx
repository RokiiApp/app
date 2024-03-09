import { memo } from 'react'
import { useGlobalResultsStore } from '@/stores/GlobalResultsStore'
import { useInputStore } from '@/stores/InputStore'

import { useRunExtensions } from '@/main/hooks/useRunPlugins'

import { ResultsList } from '@/main/components/ResultsList'
import { InputBox } from '@/main/components/InputBox'
import { RokiiLayout } from '@/main/components/RokiiLayout'

import { ungrouped } from '@/main/utils/groupBy'

const Home = () => {
  const term = useInputStore((state) => state.term)
  useRunExtensions(term)

  const results = useGlobalResultsStore((s) => s.actions)

  return <RokiiLayout
    TopBar={<InputBox />}
    ContentContainer={<ResultsList items={results} groupBy={ungrouped} />}
  />
}

const memoizedHome = memo(Home)

export { memoizedHome as Home }
