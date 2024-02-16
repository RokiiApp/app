import { create } from 'zustand';

export interface AutocompleteStore {
    value: string | undefined;
    updateValue: (term: string | undefined) => void;
}

export const useAutocompleteStore = create<AutocompleteStore>((set) => ({
    value: '',
    updateValue: (value) => set(({ value }))
}));
