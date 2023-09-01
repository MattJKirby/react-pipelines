import { useCallback } from "react"
import useStoreApi from "./useStoreApi"
import useViewportHelper from "./useViewportHelper"

/**
 * Hook for accessing ReactPipelines store internals
 */
const useReactPipelines = () => {
  const viewport = useViewportHelper()
  const store = useStoreApi()

  /**
   * Enables the deletion of an element on the graph
   * @param param0 
   */
  const deleteElements = useCallback(({removedEdgeIds, removedNodeIds}: {removedEdgeIds?: string[], removedNodeIds?: []}) => {
    const { edgeInternals, nodeInternals, removeEdge } = store.getState()
    
    if(removedEdgeIds && removedEdgeIds.length){
      const edges = [...edgeInternals.values()].filter(e => removedEdgeIds.includes(e.id))
      const changes = Array.from(edges.map(e => ({id: e.id})))
      removeEdge(changes)
    }
  }, [])

  return {
    viewport,
    deleteElements
  }
}

export default useReactPipelines