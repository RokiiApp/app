import { create } from 'zustand';

export interface InputStore {
  /** Search term in main input */
  term: string;
  /** Store last used term in separate field */
  prevTerm: string;
  /** Update the term */
  updateTerm: (term: string) => void;
}

export const useInputStore = create<InputStore>((set) => ({
  term: '',
  prevTerm: '',
  updateTerm: (term) => set((state) => ({ term, prevTerm: state.term }))
}));
