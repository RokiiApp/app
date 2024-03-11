import { App, ExtensionContext } from "@rokii/api"
import { useEffect, useState } from "react"

const randomContext = Math.random().toString(36).substring(7)

export const useOnAppRun = (app: App, globalContext: ExtensionContext) => {
    const [appOwnContext, setAppOwnContext] = useState<any>(randomContext)

    useEffect(() => {
        if (app.onAppStart) {
            app.onAppStart(globalContext).then(setAppOwnContext)
        } else {
            setAppOwnContext(undefined)
        }
    }, [])

    const pendingContext = appOwnContext === randomContext

    return { pendingContext, appOwnContext }
}
