import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
  }),
  getters: {
    currentTheme: (state) => (state.isDark ? 'dark' : 'light'),
  },
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      this.saveToLocalStorage()
    },
    setTheme(isDark) {
      this.isDark = isDark
      this.applyTheme()
      this.saveToLocalStorage()
    },
    applyTheme() {
      if (typeof window !== 'undefined') {
        const htmlElement = document.documentElement
        if (this.isDark) {
          htmlElement.classList.add('dark')
        } else {
          htmlElement.classList.remove('dark')
        }
      }
    },
    saveToLocalStorage() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', JSON.stringify(this.isDark))
      }
    },
    loadFromLocalStorage() {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme !== null) {
          this.isDark = JSON.parse(savedTheme)
        } else {
          // 默认跟随系统
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          this.isDark = prefersDark
        }
        this.applyTheme()
      }
    },
  },
})
