import { memo } from 'react'
import { useActionsStore } from '@/stores/actions'
import { useRunExtensions } from '@/main/hooks/useRunPlugins'

import { ResultsList } from '../components/ResultsList'
import { InputBox } from '../components/InputBox'
import { useInputStore } from '@/stores/input'

const Home = () => {
  const term = useInputStore((state) => state.term)
  useRunExtensions(term)

  const results = useActionsStore((s) => s.actions)

  return <>
    <InputBox />
    <ResultsList items={results} />
  </>

}

const memoizedHome = memo(Home)

export { memoizedHome as Home }
