import { Result } from "@/entities/result/Result"

const UNGROUPED_CATEGORY = "" as const

export type GroupByFunction = (results: Result[]) => {
    groupCounts: number[],
    groups: string[]
}

export const ungrouped: GroupByFunction = () => {
    return { groupCounts: [], groups: [] }
}

export const groupByExtension: GroupByFunction = (results) => {
    const groupedResults = Object.groupBy(results, (result) => result.extension)
    const groupCounts = Object.values(groupedResults).map((results) => results?.length || 0)
    const groups = Object.keys(groupedResults)
  
    return { groupCounts, groups }
}

export const groupByCustomGroup: GroupByFunction = (results) => {
    const groupedResults = Object.groupBy(results, (result) => result.group || UNGROUPED_CATEGORY)
    const groupCounts = Object.values(groupedResults).map((results) => results?.length || 0)
    const groups = Object.keys(groupedResults)

    groups.sort(groupOrderer)

    return { groupCounts, groups }
}

/**
 * Makes the ungrouped category appear first
 */
const groupOrderer = (a: string, b: string) => {
    if (a === UNGROUPED_CATEGORY) return -1
    if (b === UNGROUPED_CATEGORY) return 1
    return a.localeCompare(b)
}
