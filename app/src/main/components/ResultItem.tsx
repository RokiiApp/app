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
                `flex flex-nowrap gap-2 justify-between items-center whitespace-nowrap
                w-full h-12 rounded-lg cursor-pointer p-2 hover:bg-result-background-hover mb-1
                ${isSelected ? "bg-result-background-selected" : "bg-result-background"}`
            }
            onClick={(e) => result.onSelect(e)}
        >

            <div className={`w-full flex flex-wrap items-center gap-2 content-start`}
            >
                {icon && <SmartIcon path={icon} className="h-7 w-7 object-contain" />}
                {title &&
                    <span className={`${isSelected ? "text-result-title-selected" : "text-result-title"} text-sm`}>
                        {title}
                    </span>
                }

                {subtitle
                    && <span className={`${isSelected ? "text-result-subtitle-selected" : "text-result-subtitle"} text-xs font-light`}>
                        {subtitle}
                    </span>}
            </div>

            <div aria-label='extension-name' className='text-input'>
                {extension}
            </div>
        </div>
    )
}

export default ResultItem
