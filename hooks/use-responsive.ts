"use client"

import { useState, useEffect } from "react"

interface BreakpointConfig {
  sm: number
  md: number
  lg: number
  xl: number
  "2xl": number
}

const defaultBreakpoints: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export function useResponsive(breakpoints: Partial<BreakpointConfig> = {}) {
  const bp = { ...defaultBreakpoints, ...breakpoints }

  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  const [breakpoint, setBreakpoint] = useState<keyof BreakpointConfig>("sm")

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setScreenSize({ width, height })

      // Determine current breakpoint
      if (width >= bp["2xl"]) {
        setBreakpoint("2xl")
      } else if (width >= bp.xl) {
        setBreakpoint("xl")
      } else if (width >= bp.lg) {
        setBreakpoint("lg")
      } else if (width >= bp.md) {
        setBreakpoint("md")
      } else {
        setBreakpoint("sm")
      }
    }

    // Set initial values
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = screenSize.width < bp.md
  const isTablet = screenSize.width >= bp.md && screenSize.width < bp.lg
  const isDesktop = screenSize.width >= bp.lg
  const isLargeScreen = screenSize.width >= bp.xl

  return {
    screenSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    breakpoints: bp,
  }
}
