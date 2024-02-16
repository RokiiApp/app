import type { Result } from '@/stores/actions/ActionResult';
import { memo, useEffect, useRef, useState } from 'react';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import styles from './styles.module.css';

import { RESULT_HEIGHT, VISIBLE_RESULTS } from '@/common/constants/ui';
import Row from './Row';
import { send } from '@/common/ipc';
import { CHANNELS } from '@/common/constants/events';

const ResultsList = ({ items }: { items: Result[] }) => {
    const [selected, setSelected] = useState(0);

    const listRef = useRef<VirtuosoHandle>(null);

    const MovementHandlers = {
        "ArrowDown": () => {
            const futureSelected = selected + 1;
            if (futureSelected < items.length) {
                setSelected(futureSelected)
            } else {
                // If we are at the end of the list, go to the top
                // When items change sometimes the selected index is out of bounds
                setSelected(0);
            }
        },
        "ArrowUp": () => {
            const futureSelected = selected - 1;
            if (futureSelected >= 0) {
                setSelected(futureSelected)
            } else {
                setSelected(items.length - 1);
            }
        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        // Autocomplete
        if (e.key === "Tab") {
            const selectedAction = items[selected];
            if (selectedAction) {
                send(CHANNELS.ShowTerm, selectedAction.term);
            }
        }

        // Execute action
        if (e.key === "Enter") {
            const item = items[selected];
            if (item) {
                item.onSelect(e);
            }
        }

        // Movement
        if (e.key in MovementHandlers) {
            MovementHandlers[e.key]();
        }

    }

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        }
    }, [onKeyDown])

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollToIndex({ index: selected, align: "center", behavior: 'smooth' });
        }
    }, [selected]);

    if (items.length === 0) return null;

    return (
        <div className={styles.wrapper}>
            <Virtuoso
                tabIndex={-1}
                ref={listRef}
                className={styles.resultsList}
                overscan={5}
                height={VISIBLE_RESULTS * RESULT_HEIGHT}
                fixedItemHeight={RESULT_HEIGHT}
                totalCount={items.length}
                itemContent={(index) => {
                    const result = items[index];
                    return <Row result={result} isSelected={selected === index} />
                }}
            />
        </div>
    );
};

const memoizedResultsList = memo(ResultsList);

export { memoizedResultsList as ResultsList };
