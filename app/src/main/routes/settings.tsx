import { memo, useState } from 'react'
import SettingsComponent from '../components/Settings'
import { BackButton } from '../components/BackButton'
import { useExtensionsSettings } from '@/stores/extension-settings'
import { RokiiLayout } from '../components/RokiiLayout'

const GeneralSectionName = "General"

const Settings = () => {
    const settings = useExtensionsSettings(state => state.settings)
    const [section, setSection] = useState<string>(GeneralSectionName)

    const sections = [GeneralSectionName, ...Object.keys(settings)]

    return <RokiiLayout
        TopBar={<SettingsTopBar section={section} />}

        ContentContainer={
            <SettingsContainer
                selectedSection={section}
                sections={sections}
                setSection={setSection}
            />
        }
    />

}

const memoizedSettingsPage = memo(Settings)

export { memoizedSettingsPage as Settings }

const SettingsTopBar = ({ section }: { section: string }) => {
    return <header className='flex items-center gap-2 h-full'>
        <BackButton backLocation='/' />
        <h1 className='text-xl font-bold'>Settings</h1>
        <h2 className='text-md font-light'>/ {section}</h2>
    </header>
}

type SettingsContainerProps = {
    selectedSection: string,
    sections: string[],
    setSection: any
}

const SettingsContainer = ({ selectedSection, sections, setSection }: SettingsContainerProps) => {
    return <div className='grid grid-cols-4 gap-2'>
        <nav className="col-span-1">
            <ul className="list-none flex flex-col gap-2">
                {sections.map((item) => (
                    <li key={item} className="w-full px-2 py-1 bg-slate-700 rounded-md hover:bg-slate-400">
                        <button className="w-full text-left text-white" onClick={() => setSection(item)}>
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>

        <section className='overflow-hidden text-wrap col-span-3 border-l border-black'>
            {
                selectedSection === GeneralSectionName
                    ? <SettingsComponent />
                    : <h1>{selectedSection}</h1>
            }
        </section>
    </div>
}


