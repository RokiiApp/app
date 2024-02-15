type ScriptType = "script" | "app";


export type Extension = {
    icon: string;
    name: string;
    run: ({ display, term }: { display: (action: Action) => Promise<void>, term: string }) => Promise<void>;
    settings?: any;
}

type SrciptAction = {
    type: "script";
    run: Function;
}

type AppAction = {
    type: "app";
}

export type Action = {
    title: string;
    subtitle: string;
    type: ScriptType;
    keyword?: string[];
} & (SrciptAction | AppAction);

