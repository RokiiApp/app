import { useState } from "react";

export const useAutocomplete = () => {
    const [value, setValue] = useState('');

    return {
        value,
        setValue
    }

}
