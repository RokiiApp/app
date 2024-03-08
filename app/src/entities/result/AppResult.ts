import { AppItem } from "@rokii/api"
import { Result } from "./Result"
import { navigate } from "wouter/use-hash-location"

export class AppResult extends Result {
    appName: string
    keepTerm: boolean
  
    constructor(action: AppItem, extensionName: string) {
      super(action, extensionName)
  
      this.appName = action.appName
      this.keepTerm = action.keepTerm
    }
  
    async onSelect() {
      navigate(`/app/${this.extension}/${this.appName}?keepterm=${this.keepTerm}`)
    }
}
  