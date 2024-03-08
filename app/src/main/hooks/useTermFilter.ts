import { Result } from "@/entities/result/Result";
import { useInputStore } from "@/stores/InputStore";
import { useEffect, useState } from "react";

export const useTermFilter = (items: Result[]) => {
    const [results, setResults] = useState<Result[]>([])
    const term = useInputStore(s => s.term)

    useEffect(() => {
        const matchResults = items.filter((item) => filterFn(item, term))
        setResults(matchResults)

    }, [term, items])

    return results
}

const filterFn = (item: Result, term: string): boolean => {
    // if term is empty, return all items
    // TODO - Extensions API should allow to avoid results when term is empty
    if (!term) return true

    const { title, keywords = [], extension } = item
    
    // If title includes term, return true
    if (title.toLowerCase().includes(term.toLowerCase())) return true

    // If extension includes term, return true
    if (extension.toLowerCase().includes(term.toLowerCase())) return true

    // Keywords search:
    const isKeywordMatch = keywords.some(k => {
        // 1 - The keyword is valid as proposal for the term
        // i.e. term: "ext", keyword: "extension"
        const termPartOfKeyword = k.toLowerCase().startsWith(term.toLowerCase())

        // 2 - The term matches exactly the keyword + some other characters
        // i.e. term: "test 1", keyword: "test" --> true: "test" is the keyword + "1" extra info
        // i.e. term: "testing", keyword: "test" --> false: "testing" is not the keyword

        const keywordRegex = new RegExp(`^${k} .*`, 'i')
        const keywordMatch = keywordRegex.test(term)
        
        return termPartOfKeyword || keywordMatch
    })
    if (isKeywordMatch) return true

    return false
}
