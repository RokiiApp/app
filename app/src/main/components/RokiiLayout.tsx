type RokiiLayoutProps = {
    TopBar: React.ReactNode,
    ContentContainer: React.ReactNode,
}

export const RokiiLayout = ({ TopBar, ContentContainer }: RokiiLayoutProps) => {
    return <div className='py-0 h-full grid grid-rows-12' data-tauri-drag-region>
        <section className='px-2 row-span-1 overflow-hidden border-b' data-tauri-drag-region>
            {TopBar}
        </section>

        <div className='p-2 rounded row-span-11 overflow-hidden' data-tauri-drag-region>
            {ContentContainer}
        </div>
    </div>
}
