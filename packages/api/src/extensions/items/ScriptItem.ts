import { ItemTypes } from "."
import { Item, type ItemParams } from "./Item"

type ScriptRunner = (e: Event | React.SyntheticEvent) => void | Promise<void>

export class ScriptItem extends Item {
    run: ScriptRunner
    readonly type = ItemTypes.SCRIPT

    constructor(action: ScriptItemParams) {
        super(action)
        this.run = action.run
    }
}

export type ScriptItemParams = ItemParams & {
    run: ScriptRunner
}
