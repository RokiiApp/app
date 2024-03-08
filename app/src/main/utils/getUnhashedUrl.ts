export const getUnhashedUrl = (url: string) => {
    return url.replaceAll("/#/", "/")
}
