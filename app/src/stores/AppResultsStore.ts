import { create } from 'zustand'
import { ResultsStateCreator } from './ResultsStateCreator'

/**
 * A store aislated from the main result store to handle the actions
 * from the app extensions
 */
export const useAppResultsStore = create(ResultsStateCreator)
