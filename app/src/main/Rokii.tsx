import { Router, Route } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'

import { Home } from '@/main/routes/home'
import { ExtensionApp } from '@/main/routes/app'
import { memo } from 'react'
import { useExtensionsRepository } from '@/main/hooks/useExtensionsRepository'

/**
 * The Rokii app entry point
 */
const Rokii = () => {
    useExtensionsRepository()

    return (
        <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
            <Router hook={useHashLocation}>
                <Route path='/' component={Home} />
                <Route path='/settings' component={() => <div>Settings</div>} />
                <Route path='/app/:extension/:app' component={ExtensionApp} />
            </Router>
        </div>
    )
}

const memoizedRokii = memo(Rokii)

export { memoizedRokii as Rokii }
