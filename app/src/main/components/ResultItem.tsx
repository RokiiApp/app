import { SmartIcon } from '@rokii/ui'
import type { Result } from '@/entities/result/Result'

interface ResultProps {
    isSelected: boolean
    result: Result
}

function ResultItem({ isSelected, result }: ResultProps) {
    const { icon, title, subtitle, extension } = result

    return (
        <div
            className={
                `w-full rounded-md relative flex gap-2 flex-nowrap justify-between whitespace-nowrap cursor-pointer p-2
                h-12 text-[var(--main-font-color)] bacground-[var(--result-background)] items-center
                ${isSelected ? "bg-[var(--selected-result-background)] " : ""}`
            }
            onClick={(e) => result.onSelect(e)}
        >

            <div className={
                `w-full flex flex-wrap items-center gap-2 content-start
                ${isSelected ? "text-[var(--selected-result-color] " : ""}`}
            >
                {icon && <SmartIcon path={icon} className="h-7 w-7 object-contain" />}
                {title &&
                    <div className={
                        `text-sm text-[var(--result-title-color)]
                        ${isSelected ? "text-[var(--selected-result-title-color)]" : ""}`
                    }>
                        {title}
                    </div>
                }

                {subtitle
                    && <div className={
                        `text-xs font-light text-[var(--result-subtitle-color)]
                        ${isSelected ? "text-[var(--selected-result-subtitle-color)]" : ""}`
                    }>
                        {subtitle}
                    </div>}
            </div>

            <div aria-label='extension-name'>
                {extension}
            </div>
        </div>
    )
}

export default ResultItem
