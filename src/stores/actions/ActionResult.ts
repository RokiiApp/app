import { Action, ActionType } from "@/extensions/types";

export class ActionResult {
    /**
     * The extension where the action is coming from
     */
    extension: string;
    title: string;
    subtitle: string;
    type: ActionType;
    id: string;
    icon: string;
    script: Function | undefined;


    constructor(action: Action, extensionName: string) {
        this.title = action.title;
        this.subtitle = action.subtitle;
        this.type = action.type;
        this.icon = action.icon;
        this.extension = extensionName;

        if (action.type === "script") {
            this.script = action.run;
        }

        this.id = action.id || crypto.randomUUID();

    }

    async execute() {
        if (this.type === "script" && this.script) {
            this.script();
        }


    }

    update(newAction: Action) {
        this.title = newAction.title;
        this.subtitle = newAction.subtitle;
        this.type = newAction.type;
        this.icon = newAction.icon;

        if (newAction.type === "script") {
            this.script = newAction.run;
        }

        return this;
    }




}
