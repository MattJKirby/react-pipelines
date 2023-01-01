import { useMemo } from "react";

let graphInstance = 0;

/**
 * Simple useGraphInstance hook to keep track of the graphProviders used.
 * Returns the value of teh graph instance used
 * @returns 
 */
const useGraphInstance = () => {
  const instance = useMemo(() => ++graphInstance, [])

  return `${instance}`
}

export default useGraphInstance;