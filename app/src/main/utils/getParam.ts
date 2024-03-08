import { getUnhashedUrl } from "./getUnhashedUrl";

export const getParam = (param: string) => {
    const location = getUnhashedUrl(window.location.href)
    let url = new URL(location);
    let params = new URLSearchParams(url.search);

    return params.get(param)
}
