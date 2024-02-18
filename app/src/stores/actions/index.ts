import type { Action } from '@/extensions/types'
import { create } from 'zustand'
import { type Result, ResultCreator } from './ActionResult'

export interface ActionsStore {
  actions: Result[]

  addActions: (actions: Action[], extensionName: string) => void
  updateAction: (id: string, newAction: Action) => void
  removeAction: (id: string) => void
  removeAllActions: () => void
}

export const useActionsStore = create<ActionsStore>((set) => ({
  actions: [],

  addActions: (actions, extensionName) => {
    const actionResults = actions.map((action) => ResultCreator.create(action, extensionName))
    set((state) => ({ actions: [...state.actions, ...actionResults] }))
  },

  updateAction: (id, newAction) => {
    set((state) => {
      const oldActionIndex = state.actions.findIndex((action) => action.id === id)

      const oldAction = state.actions[oldActionIndex]

      const updatedAction = oldAction.update(newAction)

      const newActions = state.actions.with(oldActionIndex, updatedAction)

      return { actions: newActions }
    })
  },

  removeAction: (id) => {
    set((state) => {
      const newActions = state.actions.filter((action) => action.id !== id)

      return { actions: newActions }
    })
  },

  removeAllActions: () => {
    set({ actions: [] })
  }
}))
