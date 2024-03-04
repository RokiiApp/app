import type { Item } from '@rokii/api'
import type { Result } from '@/entities/result/Result'
import { StoreApi, UseBoundStore } from 'zustand'

/**
 * A Store that handles the available Results
 * to be displayed in the app
 */
export interface ResultsStore {
    actionsMap: Map<string, Result>
    actions: Result[]
  
    addActions: (actions: Item[], extensionName: string) => void
    updateAction: (id: string, newAction: Item) => void
    removeAction: (id: string) => void,
    removeActionsFromExtension: (extensionName: string) => void,
    removeAllActions: () => void
  }

export type ZustandResultsStore = UseBoundStore<StoreApi<ResultsStore>>
