import { useParams } from 'wouter'

export const useAppParamsInfo = () => {
    const { extension, app: appWithQueryString } = useParams<{ extension: string, app: string }>()
    const [appId] = appWithQueryString.split("?")

    return { extensionName: extension, appId }

}
