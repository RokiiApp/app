import { Extension } from "@/extensions/Extension";

export type ExtensionGetter = () => Promise<Extension[]>
