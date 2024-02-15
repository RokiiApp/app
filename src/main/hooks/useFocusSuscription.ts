import type { FocusableChannel } from '@/common/constants/events';
import { on } from '@/common/ipc';
import { useEffect } from 'react';

export const useFocusSuscription = <T extends React.RefObject<any>>(focusableElementRef: T, channel: FocusableChannel, customFocusHandler?: (element: T) => void) => {

    const onFocusInputRequest = () => {
        if (customFocusHandler) {
            customFocusHandler(focusableElementRef)
        } else {
            focusableElementRef.current?.focus();
        }
    };

    useEffect(() => {
        if (!focusableElementRef) return;

        const unlistenPromise = on(channel, onFocusInputRequest);

        // function to be called when unmounted
        return () => {
            unlistenPromise.then(unlisten => unlisten());
        };
    }, [focusableElementRef, channel, customFocusHandler]);
};
