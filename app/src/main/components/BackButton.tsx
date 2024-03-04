import { navigate } from "wouter/use-hash-location"
export const BackButton = ({ backLocation }: { backLocation: string }) => {
    return (
        <button className="text-accent-text bg-accent-background rounded-full p-1 hover:bg-slate-500" onClick={() => navigate(backLocation)}>
            <img src="./back-icon.svg" alt="back" className="w-5 h-5" />
        </button>
    )
}
