import { useEffect, useState } from 'react'

/** Tailwind `lg` default. */
export function useIsLg() {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return matches
}
