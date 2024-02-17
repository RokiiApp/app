import ReactMarkdown from 'react-markdown'
import styles from './styles.module.css'
import { useReadme } from './hooks/useReadme'

const isRelative = (src: string) => src.match(/^(https?:|data:)/) == null

const urlTransform = (src: string, repoName: string) => {
  if (isRelative(src)) { return `http://raw.githubusercontent.com/${repoName}/master/${src}` }
  return src
}

export const Description = ({ repoName }: { repoName: string }) => {
  const readme = useReadme(repoName)

  if (!readme) return null

  return (
    <ReactMarkdown
      className={styles.markdown}
      urlTransform={(src) => urlTransform(src, repoName)}
    >
      {readme}
    </ReactMarkdown>
  )
}
