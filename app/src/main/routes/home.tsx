import { memo } from 'react'
import { useGlobalResultsStore } from '@/stores/GlobalResultsStore'
import { useRunExtensions } from '@/main/hooks/useRunPlugins'

import { ResultsList } from '../components/ResultsList'
import { InputBox } from '../components/InputBox'
import { useInputStore } from '@/stores/InputStore'
import { RokiiLayout } from '../components/RokiiLayout'

const Home = () => {
  const term = useInputStore((state) => state.term)
  useRunExtensions(term)

  const results = useGlobalResultsStore((s) => s.actions)

  return <RokiiLayout
    TopBar={<InputBox />}
    ContentContainer={<ResultsList items={results} />}
  />
}

const memoizedHome = memo(Home)

export { memoizedHome as Home }
