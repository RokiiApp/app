import type { FocusableChannel } from '@/common/constants/events'
import { on } from '@/common/ipc'
import { useEffect } from 'react'

export const useFocusSuscription = <T extends React.RefObject<any>>(focusableElementRef: T, channel: FocusableChannel) => {

  useEffect(() => {
    if (!focusableElementRef) return

    const { current } = focusableElementRef
    const unlistenPromise = on(channel, current.focus())

    // function to be called when unmounted
    return () => {
      unlistenPromise.then(unlisten => unlisten())
    }
  }, [focusableElementRef, channel])
}
