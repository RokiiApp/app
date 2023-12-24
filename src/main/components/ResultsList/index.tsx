import type { PluginResult } from '@rokii/types';

import { useEffect, useRef, memo } from 'react';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import styles from './styles.module.css';

import { RESULT_HEIGHT, VISIBLE_RESULTS } from '@/common/constants/ui';
import Row from './Row';
import { useRokiStore } from '@/state/rokiStore';
import { useGetPluginResults } from '@/main/hooks/useGetPluginResults';
import { wrapEvent } from '@/main/utils/events';
import { PluginPreview, PluginResultWithPreview } from '@/main/components/PluginPreview';
import { useInputStore } from '@/state/inputStore';
import { appWindow } from '@tauri-apps/api/window';

type SelectItemFn = (
  item: PluginResult,
  realEvent:
    | React.KeyboardEvent<HTMLDivElement>
    | React.MouseEvent<HTMLDivElement>
) => void;

const ResultsList = () => {
  const [term, updateTerm] = useInputStore((s) => [s.term, s.updateTerm]);
  useGetPluginResults(term);

  const [results, selected] = useRokiStore((s) => [s.results, s.selected]);
  const listRef = useRef<VirtuosoHandle>(null);

  /**
   * Select item from results list
   */
  const selectItem: SelectItemFn = (item, realEvent) => {
    const event = wrapEvent(realEvent);
    if (!item.onSelect && item.term) {
      return updateTerm(item.term);
    }

    item.onSelect(event);
    if (event.defaultPrevented) return;
    appWindow.hide();
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToIndex({ index: selected, align: 'end' });
    }
  }, [selected]);

  const rowRenderer = ({ index }: { index: number }) => {
    const result = results[index];
    const isSelected = index === selected;
    const attrs = {
      index,
      ...result,
      isSelected,
      onSelect: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        selectItem(result, event)

    } as const;
    return <Row {...attrs} />;
  };

  if (results.length === 0) return null;

  const selectedResult = results[selected];
  return (
    <div className={styles.wrapper}>
      <Virtuoso
        tabIndex={-1}
        ref={listRef}
        className={styles.resultsList}
        overscan={5}

        height={VISIBLE_RESULTS * RESULT_HEIGHT}
        fixedItemHeight={RESULT_HEIGHT}
        totalCount={results.length}
        itemContent={(index) => (rowRenderer({ index }))}
      />

      {typeof selectedResult.getPreview === 'function' && (
        <PluginPreview plugin={selectedResult as PluginResultWithPreview} />
      )}
    </div>
  );
};

export default memo(ResultsList);
