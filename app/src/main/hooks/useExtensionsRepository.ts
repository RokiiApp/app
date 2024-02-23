import { extensionsRepository } from "@/extensions/repo/ExtensionsRespository"
import { useEffect } from "react"

/**
 * Hook used to initialize the extensions repository
 */
export const useExtensionsRepository = () => {
    useEffect(() => {
        extensionsRepository.init()

        return () => {
            extensionsRepository.destroy()
        }
    }, [])
}    
