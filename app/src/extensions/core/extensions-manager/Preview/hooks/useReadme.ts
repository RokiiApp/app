import { useEffect, useState } from 'react'
import { getReadme } from '../../utils/dataFetching'

export const useReadme = (repoName: string) => {
  const [readme, setReadme] = useState<string>('')

  useEffect(() => {
    getReadme(repoName).then(setReadme)
  }, [])

  return readme
}
