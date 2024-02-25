import { memo, useState } from 'react'
import SettingsComponent from '../components/Settings'
import * as config from '@/common/config'
import { BackButton } from '../components/BackButton'

const SECTIONS = ["General", "Extensions", "About"]

const Settings = () => {
    const [section, setSection] = useState<typeof SECTIONS[number]>(SECTIONS[0])

    return <div className='py-2 px-4 h-full grid grid-rows-11 gap-2' data-tauri-drag-region>
        <header className='flex items-center gap-2 row-span-1'>
            <BackButton backLocation='/' />
            <h1 className='text-xl font-bold'>Settings</h1>
            <h2 className='text-md font-light'>/ {section}</h2>
        </header>

        <div className='row-span-10 grid grid-cols-4 gap-2'>
            <nav className="col-span-1">
                <ul className="list-none flex flex-col gap-2">
                    {SECTIONS.map((item) => (
                        <li key={item} className="w-full px-2 py-1 bg-slate-700 rounded-md hover:bg-slate-400">
                            <button className="w-full text-left text-white" onClick={() => setSection(item)}>
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <section className='overflow-hidden text-wrap col-span-3 border-l border-black'>
                <SettingsComponent
                    get={config.get}
                    // @ts-ignore
                    set={config.set}
                />
            </section>
        </div>
    </div>

}

const memoizedSettingsPage = memo(Settings)

export { memoizedSettingsPage as Settings }
