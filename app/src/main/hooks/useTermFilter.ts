import { Result } from "@/stores/actions/ActionResult";
import { useInputStore } from "@/stores/InputStore";
import { useEffect, useState } from "react";

export const useTermFilter = (items: Result[]) => {
    const [results, setResults] = useState<Result[]>([])
    const term = useInputStore(s => s.term)

    useEffect(() => {
        setResults(items.filter((item) => filterFunction(term, item)))

    }, [term, items])

    return results
}

const filterFunction = (term: string, item: Result): boolean => {
    const { title, keywords = [], extension } = item

    const searchStrings = [title, ...keywords, extension].join(' ').toLowerCase()

    return searchStrings.includes(term.trim().toLowerCase())
}
