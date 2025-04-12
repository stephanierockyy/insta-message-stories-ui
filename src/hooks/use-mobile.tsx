
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Initialize with a value based on window width if available, otherwise null
  // This prevents the flash by having a good default value on first render
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Check if window is defined (we're in the browser)
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    // Default to false if SSR
    return false;
  });

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Modern approach using addEventListener
    mql.addEventListener("change", checkIsMobile)
    
    // Initial check
    checkIsMobile()
    
    return () => mql.removeEventListener("change", checkIsMobile)
  }, [])

  return isMobile
}
