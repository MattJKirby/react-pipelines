import { useEffect, useLayoutEffect, useRef } from 'react'

function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  useLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (!delay && delay !== 0) {
      return
    }

    const id = setTimeout(() => tick, delay)

    return () => clearTimeout(id)
  }, [delay])
}

export default useTimeout;