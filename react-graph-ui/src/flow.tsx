import React, { ComponentType, useRef } from "react"
import { useEffect } from "react"
import { useNodeStore } from "./stores/nodeStore"
import FlowZoom from "./zoom"
import { INodeData } from "./Node/INodeData"
import { useGraphStore } from "./stores/GraphStore"

interface FlowProps {
  children: React.ReactNode;
  nodes: INodeData[];
  nodeTypes: { [key: string]: ComponentType<any> };
}

/**
 * Graph entrypoint component
 * @param param0 
 * @returns 
 */
export const Flow = ({children, nodes, nodeTypes}: FlowProps) => {
  const nodesRef = useRef(useNodeStore.getState().nodes)
  const addNode = useNodeStore((state) => state.addNode)
  const setUserNodeTypes = useGraphStore((state) => state.setUserNodeTypes)


  /**
   * Enables the nodesRef to suscriube to state.nodes
   */
  useEffect(() => useNodeStore.subscribe(
    state => (nodesRef.current = state.nodes)
  ), [])

  /**
   * When nodeData is modified, publish changes to the NodeStore
   */
  useEffect(() => {
    nodes.forEach(node => {
      if(!nodesRef.current.some(n => n.id === node.id)){
        addNode(node)
      }
    })
  }, [addNode, nodes, nodesRef])

  /**
   * Publish nodeTypes to the store
   */
  useEffect(() => {
    setUserNodeTypes(nodeTypes);
    }, [setUserNodeTypes, nodeTypes]);

  return (
    <div style={{width: '100%', height: '100%', overflow: "hidden", position: "relative"}}>
      <FlowZoom />
      {children}
    </div> 
  )
}

export default Flow