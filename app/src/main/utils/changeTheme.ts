type ThemeMode = 'light' | 'dark'
/**
 * Change current theme
 *
 */
export const changeTheme = (theme: ThemeMode) => {
  if (theme === "light") {
    document.body.classList.remove("dark")
    return
  }
  if (theme === "dark") {
    document.body.classList.add("dark")
    return
  }
}
