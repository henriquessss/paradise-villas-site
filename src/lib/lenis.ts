import type Lenis from 'lenis'

// Single Lenis instance shared by SmoothScroll (owner) and UI that must pause scrolling.
let instance: Lenis | null = null

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis
}
export const getLenis = () => instance
