import { Result } from "./Result"

/**
 * A Result wich only displays information
 * It is not interactive
 */
export class InfoResult extends Result {
    async onSelect() { };
}
