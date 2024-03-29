import { ItemTypes } from "."
import { Item, type ItemParams } from "./Item"

export class InfoItem extends Item {
    readonly type = ItemTypes.INFO

    constructor(action: InfoItemParams) {
        super(action)
    }
}

export type InfoItemParams = {} & ItemParams
