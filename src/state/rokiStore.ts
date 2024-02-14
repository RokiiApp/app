import type { PluginResult } from '@rokii/types';

import { create } from 'zustand';
import { isResultValid } from './utils';
import icon from "@/extensions/core/icon.png"

export interface RokiStore {
  results: PluginResult[];
  /**
   * Index of selected result
   */
  selected: number;
  /**
   * Reset state to initial state
   */
  reset: () => void;
  addResult: (pluginName: string, result: PluginResult | PluginResult[], pluginKeywords?: string[]) => void;
  hide: (id: string) => void;
  updateResult: (id: string, newResult: PluginResult) => void;
  moveCursor: (direction: number) => void;
  setSelected: (index: number) => void;
}

const INITIAL_STATE = Object.freeze({
  results: [],
  selected: 0
});

export const useRokiStore = create<RokiStore>((set) => ({
  ...INITIAL_STATE,

  reset: () => set(INITIAL_STATE),

  addResult: (pluginName, result, pluginKeywords) => {
    if (!isResultValid(result)) return;

    return set((state) => {
      let resultsArray = Array.isArray(result) ? result : [result];

      const normalizedNewResults = resultsArray.map((result) => ({
        icon,
        // Capitalize first letter of plugin name.
        title: `${pluginName[0].toUpperCase()}${pluginName.slice(1)}`,
        term: pluginKeywords ? pluginKeywords[0] : result.title,
        ...result,
        id: `${pluginName}-${result.id || result.title}`
      }));

      // TODO - Maybe this brokes the update by id logic? Should a new result with same id replace the old one?
      // Maybe we should filter from the state.results array the results with same id as the new results so we only left the new ones
      const deleteDuplicatesFilter = (element: PluginResult) => {
        return !state.results.some((result) => result.id === element.id);
      };

      const newResultsWithoutDuplicates = normalizedNewResults.filter(deleteDuplicatesFilter);

      return { results: [...state.results, ...newResultsWithoutDuplicates] };
    });
  },

  hide: (id) =>
    set((state) => {
      const newResults = state.results.filter((i) => i.id !== id);
      return { results: newResults };
    }),

  updateResult: (id, newResult) =>
    set((state) => {
      const indexToUpdate = state.results.findIndex((i) => i.id === id);
      const oldResult = state.results[indexToUpdate];

      const updatedResult = { ...oldResult, ...newResult };

      const results = state.results.with(indexToUpdate, updatedResult);

      return { results }
    }),

  moveCursor: (direction) =>
    set((state) => {
      const newSelected = state.selected + direction;
      // If new selected is out of bounds, do nothing
      if (newSelected < 0 || newSelected >= state.results.length) {
        return state;
      }

      return { selected: newSelected };
    }),

  setSelected: (index: number) => set({ selected: index })
}));
