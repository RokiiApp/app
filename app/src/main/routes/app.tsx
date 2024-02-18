import { memo } from 'react'
import { ResultsList } from '../components/ResultsList'
import { useRunApp } from '../hooks/useRunApp'

const App = ({ input }: { input: string }) => {
  const { results } = useRunApp(input)

  return <ResultsList items={results} />
}

const memoizedHome = memo(App)

export { memoizedHome as App }
