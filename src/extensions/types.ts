export type ActionType = "script" | "app" | "info";

export type ExtensionContext = {
    display: (actions: Action[]) => Promise<void>;
    term: string;
    update: (id: string, action: Action) => void;
    actions: {
        replaceTerm: (term: string) => void;
    }
}

export type ExtensionModule = {
    icon: string;
    name: string;
    run: (context: ExtensionContext) => Promise<void>;
    settings?: any;
    initialize?: (...args: any[]) => void;
    initializeAsync?: (...args: any[]) => Promise<void>;
    onMessage?: (data: unknown) => void;
}

export type ScriptAction = {
    type: "script";
    run: (e: Event | React.SyntheticEvent) => Promise<void>;
}

type AppAction = {
    type: "app";
}

type InfoAction = {
    type: "info";
}

export type Action = {
    /**
     * An unique identifier for the action, if not provided, it will be generated
     * Used to update or remove the action from the store
     */
    id?: string;
    title: string;
    subtitle?: string;
    type: ActionType;
    keyword?: string[];
    /**
     * The icon to be displayed in the action
     * If not provided, the extension icon will be used
     * If the extension icon is not provided, the default icon will be used
     */
    icon?: string;
} & (ScriptAction | AppAction | InfoAction);

