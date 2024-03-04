import { create } from 'zustand'
import { ResultCreator } from '@/entities/ResultCreator'
import { ResultsStore } from '@/entities/ResultsStore'

export const useGlobalResultsStore = create<ResultsStore>((set, get) => ({
  actionsMap: new Map(),
  actions: [],

  addActions: (actions, extensionName) => {
    const actionResults = actions.map((action) => {
      const newResult = ResultCreator.create(action, extensionName)
      return [newResult.id, newResult] as const
    })

    const newMapActions = new Map([...get().actionsMap, ...actionResults])
    const newActions = Array.from(newMapActions.values())

    set(() => ({ actionsMap: newMapActions, actions: newActions }))
  },

  updateAction: (id, newAction) => {
    const actionsMap = get().actionsMap;

    const oldAction = actionsMap.get(id)
    if (!oldAction) return

    const updatedAction = oldAction.update(newAction)

    actionsMap.set(updatedAction.id, updatedAction)

    const newActions = Array.from(actionsMap.values())

    set(() => ({ actionsMap, actions: newActions }))
  },

  removeAction: (id) => {
    const actionsMap = get().actionsMap;
    actionsMap.delete(id)

    const newActions = Array.from(actionsMap.values())

    set(() => ({ actionsMap, actions: newActions }))
  },

  removeActionsFromExtension: (extensionName: string) => {
    const actionsMap = get().actionsMap;

    for (const [id, action] of actionsMap) {
      if (action.extension === extensionName) {
        actionsMap.delete(id)
      }
    }

    const newActions = Array.from(actionsMap.values())

    set(() => ({ actionsMap, actions: newActions }))
  },

  removeAllActions: () => {
    set({ actions: [], actionsMap: new Map() })
  }
}))
