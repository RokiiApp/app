import type { ExtensionModule, ItemParams } from ".."
import { Item, ItemTypes } from "."

export class AppItem extends Item {
    readonly type = ItemTypes.APP
    appName: string
    keepTerm: boolean

    constructor(action: AppItemParams) {
        super(action)
        this.appName = action.appName
        this.keepTerm = action.keepTerm || false
    }
}

export type AppItemParams = ItemParams & {
    /**
     * The name of the app that will be launched when the item is selected.
     * This name must math the name of the app in the {@link ExtensionModule.apps} object.
     */
    appName: string,
    /**
     * An option to keep the term in the input field after the app is launched.
     */
    keepTerm?: boolean
}
