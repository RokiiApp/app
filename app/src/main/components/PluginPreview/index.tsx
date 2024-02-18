import type { PluginResult } from '@rokii/api'
import { focusableSelector } from '@rokii/ui'
import { CHANNELS } from '@/common/constants/events'

import { ReactElement, useRef } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import styles from './styles.module.css'
import { useFocusSuscription } from '@/main/hooks/useFocusSuscription'

type FocusableElements = HTMLAnchorElement | HTMLAreaElement | HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

/**
 * Set focus to first focusable element in preview
 */
const focusPreview = (ref: React.RefObject<HTMLDivElement>) => {
  const firstFocusable = ref.current?.querySelector<FocusableElements>(focusableSelector)
  if (firstFocusable != null) {
    firstFocusable.focus()
  }
}

const ErrorPluginPreview = ({ error }: FallbackProps) => {
  return (
    <div>
      Plugin Failed to run:
      <br />
      {error.message}
    </div>
  )
}

export type PluginResultWithPreview = PluginResult & { getPreview: () => ReactElement | null }

export const PluginPreview = ({ plugin }: { plugin: PluginResultWithPreview }) => {
  const ref = useRef<HTMLDivElement>(null)
  useFocusSuscription(ref, CHANNELS.FocusPreview, focusPreview)

  const Preview = plugin.getPreview()

  const previewIsString = typeof Preview === 'string'
  return (
    <div className={styles.preview} id='preview' ref={ref}>
      {previewIsString
        ? (<div dangerouslySetInnerHTML={{ __html: Preview }} />)
        : (
          <ErrorBoundary
            FallbackComponent={ErrorPluginPreview}
            onError={(error) => console.error(error)}
            resetKeys={[plugin.title]}

          >
            {Preview}
          </ErrorBoundary>
        )}
    </div>
  )
}
