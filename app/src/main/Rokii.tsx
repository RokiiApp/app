import { memo } from 'react'
import { Router, Route } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'

import { useGlobalSettings } from '@/main/hooks/useGlobalSettings'
import { Home } from '@/main/routes/home'
import { ExtensionApp } from '@/main/routes/app'
import { Settings } from '@/main/routes/settings'
import { useWindowListeners } from './hooks/useWindowListeners'

/**
 * The Rokii app entry point
 */
const Rokii = () => {
    useGlobalSettings()
    useWindowListeners()

    return (
        <div className='h-full w-full flex flex-col'>
            <Router hook={useHashLocation}>
                <Route path='/' component={Home} />
                <Route path='/settings' component={Settings} />
                <Route path='/app/:extension/:app' component={ExtensionApp} />
            </Router>
        </div>
    )
}

const memoizedRokii = memo(Rokii)

export { memoizedRokii as Rokii }
