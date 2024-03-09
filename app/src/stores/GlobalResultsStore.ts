import { create } from 'zustand'
import { ResultsStateCreator } from './ResultsStateCreator'

export const useGlobalResultsStore = create(ResultsStateCreator)
