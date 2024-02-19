import { ItemTypes } from "."
import { Item, type ItemParams } from "./Item"

export class AppItem extends Item {
    type = ItemTypes.APP
    appName: string

    constructor(action: AppItemParams) {
        super(action)
        this.appName = action.appName
    }
}

export type AppItemParams = ItemParams & {
    appName: string
}
