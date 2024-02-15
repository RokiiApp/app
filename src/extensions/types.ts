export type ActionType = "script" | "app";

export type Extension = {
    icon: string;
    name: string;
    run: ({ display, term }: { display: (actions: Action[]) => Promise<void>, term: string }) => Promise<void>;
    settings?: any;
    initialize?: (...args: any[]) => void;
    initializeAsync?: (...args: any[]) => Promise<void>;
    onMessage?: (data: unknown) => void;
}

type ScriptAction = {
    type: "script";
    run: Function;
}

type AppAction = {
    type: "app";
}

export type Action = {
    /**
     * An unique identifier for the action, if not provided, it will be generated
     * Used to update or remove the action from the store
     */
    id?: string;
    title: string;
    subtitle: string;
    type: ActionType;
    keyword?: string[];
    /**
     * The icon to be displayed in the action
     * If not provided, the extension icon will be used
     * If the extension icon is not provided, the default icon will be used
     */
    icon?: string;
} & (ScriptAction | AppAction);

