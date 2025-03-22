/**
 * The current toggle state where `true` is dark mode.
 *
 * @default prefers-color-scheme
 */
let darkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches

const observers: (() => void)[] = []

// Set up the initial state
const html = document.documentElement
if (darkMode) {
  html.classList.add('dark')
} else {
  html.classList.add('light')
}

export default {
  /** The current dark mode state. Read only. */
  get isDarkMode() {
    return darkMode
  },

  /**
   * Provides a callback function to be triggered when
   * the dark mode state changes.
   *
   * @returns An object with a `disconnect` method to stop observing.
   * @example
   * const observer = lightDarkMode.observe(() => {
   *  console.log('Dark mode state changed!')
   * })
   *
   * onBeforeUnmount(() => {
   *  observer.disconnect()
   * })
   */
  observe: (callback: () => void) => {
    observers.push(callback)

    return {
      disconnect: () => {
        let index = observers.indexOf(callback)

        // Remove all instances of the callback
        while (index !== -1) {
          observers.splice(index, 1)
          index = observers.indexOf(callback)
        }
      },
    }
  },

  /** Toggles between light and dark mode. */
  toggle() {
    const html = document.documentElement

    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      html.classList.add('light')
      darkMode = false
    } else {
      html.classList.remove('light')
      html.classList.add('dark')
      darkMode = true
    }

    for (const observer of observers) {
      observer()
    }
  },
}
