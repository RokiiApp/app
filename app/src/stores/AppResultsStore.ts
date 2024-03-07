import { create } from 'zustand'
import { ResultsStore } from '@/entities/ResultsStore'
import { ResultCreator } from '@/entities/ResultCreator'

/**
 * A store aislated from the main result store to handle the actions
 * from the app extensions
 */
export const useAppResultsStore = create<ResultsStore>((set) => ({
  actionsMap: new Map(),
  actions: [],

  addActions: (actions, extensionName) => {
    const actionResults = actions.map((action) => {
      const newResult = ResultCreator.create(action, extensionName)
      return [newResult.id, newResult] as const
    })

    set(({ actionsMap: oldActionsMap }) => {
      const actionsMap = new Map([...oldActionsMap, ...actionResults])

      const actions = [...actionsMap.values()]
      
      return { actionsMap, actions }
    })
  },

  updateAction: (id, newAction) => {
    set(({ actionsMap: oldActionsMap }) => {
      const actionsMap = new Map(oldActionsMap)

      const oldAction = actionsMap.get(id)
      if (!oldAction) return {}

      const updatedAction = oldAction.update(newAction)

      actionsMap.set(updatedAction.id, updatedAction)

      const actions = [...actionsMap.values()]

      return { actionsMap, actions }
    })
  },

  removeAction: (id) => {
    set(({ actionsMap: oldActionsMap }) => {
      const actionsMap = new Map(oldActionsMap)
      actionsMap.delete(id)

      const actions = [...actionsMap.values()]
      return { actionsMap, actions }
    })
  },

  removeActionsFromExtension: (extensionName: string) => {
    set(({ actionsMap: oldActionsMap }) => {
      const actionsMap = new Map(oldActionsMap)

      for (const [id, action] of actionsMap) {
        if (action.extension === extensionName) {
          actionsMap.delete(id)
        }
      }

      const actions = [...actionsMap.values()]

      return { actionsMap, actions }
    })
  },

  removeAllActions: () => {
    set({ actions: [], actionsMap: new Map() })
  }
}))
