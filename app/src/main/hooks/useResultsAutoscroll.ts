import { useEffect, useRef } from "react"
import type { VirtuosoHandle } from "react-virtuoso";

export const useResultsAutoscroll = (index: number) => {
    const listRef = useRef<VirtuosoHandle>(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollToIndex({ index, align: "center", behavior: 'smooth' });
        }
    }, [index]);

    return { listRef }
}
