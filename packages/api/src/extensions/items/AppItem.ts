import { ItemTypes } from "."
import { Item, type ItemParams } from "./Item"

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
    appName: string,
    keepTerm?: boolean
}
