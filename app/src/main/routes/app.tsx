import { memo } from 'react'
import { ResultsList } from '../components/ResultsList'
import { useRunApp } from '../hooks/useRunApp'

const App = ({ input }: { input: string }) => {
  // TODO - Fix useRunApp hook to avoid returning null
  const { results } = useRunApp(input) || { results: [] }

  return <ResultsList items={results} />
}

const memoizedHome = memo(App)

export { memoizedHome as App }
