import { ActionsMap, ResultsStore } from "@/entities/ResultsStore";
import { ResultCreator } from '@/entities/ResultCreator'
import { StateCreator } from "zustand";

export const ResultsStateCreator: StateCreator<ResultsStore> = (set) => ({
    actionsMap: new Map(),
    actions: [],
  
    addActions: (actions, extensionName) => {
      const actionResults = actions.map((action) => {
        const newResult = ResultCreator.create(action, extensionName)
        return [newResult.id, newResult] as const
      })
  
      set(({ actionsMap: oldActionsMap }) => {
        const actionsMap = new Map([...oldActionsMap, ...actionResults])
  
        const actions = createActionsArray(actionsMap)
  
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
  
        const actions = createActionsArray(actionsMap)
  
        return { actionsMap, actions }
      })
    },
  
    removeAction: (id) => {
      set(({ actionsMap: oldActionsMap }) => {
        const actionsMap = new Map(oldActionsMap)
        actionsMap.delete(id)
  
        const actions = createActionsArray(actionsMap)
  
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
  
        const actions = createActionsArray(actionsMap)
  
        return { actionsMap, actions }
      })
    },
  
    removeAllActions: () => {
      set({ actions: [], actionsMap: new Map() })
    }
  })

  const createActionsArray = (actionsMap: ActionsMap) => {
    const actions = [...actionsMap.values()]
  
    actions.sort((a, b) => a.order < b.order ? -1 : 1)
  
    return actions
  }
