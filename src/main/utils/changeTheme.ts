/**
 * Change current theme
 *
 * @param src Absolute path to new theme css file
 */
export const changeTheme = (src: string) => {
    (document.getElementById('rokii-theme') as HTMLLinkElement).href = src;
};
