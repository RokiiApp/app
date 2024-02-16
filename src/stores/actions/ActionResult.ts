import { CHANNELS } from "@/common/constants/events";
import { send } from "@/common/ipc";
import { Action, ScriptAction } from "@/extensions/types";
import { appWindow } from "@tauri-apps/api/window";
import { navigate } from "wouter/use-hash-location";

export class ResultCreator {
    static create(action: Action, extensionName: string): Result {
        switch (action.type) {
            case "script":
                return new ScriptActionResult(action, extensionName);
            case "app":
                return new AppActionResult(action, extensionName);
            default:
                return new InfoResult(action, extensionName);
        }
    }
}

export class Result {
    extension: string;
    title: string;
    subtitle: string;
    icon: string;
    autocomplete: string;
    script: ScriptAction["run"] | undefined;
    readonly id: string;

    constructor(action: Action, extensionName: string) {
        this.title = action.title;
        this.subtitle = action.subtitle;
        this.icon = action.icon;
        this.extension = extensionName;
        this.autocomplete = action.autocomplete || action.title;
        this.id = action.id || crypto.randomUUID();

        if (action.type === "script") {
            this.script = action.run;
        }

    }

    update(newAction: Action) {
        this.title = newAction.title;
        this.subtitle = newAction.subtitle;
        this.icon = newAction.icon;

        if (newAction.type === "script") {
            this.script = newAction.run;
        }

        return this;
    }

    async onSelect(e: Event | React.SyntheticEvent) {
        if (e.defaultPrevented) return;
        send(CHANNELS.ClearInput)
        await appWindow.hide();
    };
}

/**
 * A factory of results
 */
class InfoResult extends Result {
    async onSelect() { };
}

class ScriptActionResult extends Result {
    constructor(action: Action, extensionName: string) {
        super(action, extensionName);

        if (action.type !== "script") {
            throw new Error("Invalid action type");
        }

        this.script = action.run;
    }

    async onSelect(e: Event | React.SyntheticEvent) {
        this.script(e);
        await super.onSelect(e);
    }

}

class AppActionResult extends Result {
    appName: string;

    constructor(action: Action, extensionName: string) {
        super(action, extensionName);

        if (action.type !== "app") {
            throw new Error("Invalid action type");
        }

        this.appName = action.appName;
    }

    async onSelect() {
        navigate(`/app/${this.extension}/${this.appName}`)
    }

}
