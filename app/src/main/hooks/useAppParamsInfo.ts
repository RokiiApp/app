import { useParams } from 'wouter'

type AppParamsInfo = {
    extension: string
    app: string
}

export const useAppParamsInfo = () => {
    const { extension, app: appWithQueryString } = useParams<AppParamsInfo>()
    
    // Remove the query string from the app id 
    const [appId] = appWithQueryString.split("?")

    return { extensionName: extension, appId }
}
