import { memo } from 'react'

const Settings = () => {
    return <h1>Settings Page</h1>
}

const memoizedSettingsPage = memo(Settings)

export { memoizedSettingsPage as Settings }
