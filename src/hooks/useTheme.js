import { useEffect, useState } from 'react'

const storageKey = 'sprintboard.theme'

function loadTheme() {
  const saved = localStorage.getItem(storageKey)

  if (saved === 'light' || saved === 'dark') {
    return saved
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState(loadTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(storageKey, theme)
  }, [theme])

  return [theme, setTheme]
}
