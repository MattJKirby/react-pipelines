import React, { useRef } from "react"
import { useEffect } from "react"
import { useNodeStore } from "./stores/nodeStore"
import FlowZoom from "./zoom"
import { INodeData } from "./Node/INodeData"

interface FlowProps {
  children: React.ReactNode;
  nodes: INodeData[]
}

export const Flow = ({children, nodes}: FlowProps) => {
  const nodesRef = useRef(useNodeStore.getState().nodes)
  const addNode = useNodeStore((state) => state.addNode)
  
  useEffect(() => useNodeStore.subscribe(
    state => (nodesRef.current = state.nodes)
  ), [])

  useEffect(() => {
    nodes.forEach(node => {
      if(!nodesRef.current.some(n => n.id === node.id)){
        addNode(node)
      }
    })
  }, [addNode, nodes, nodesRef])

  return (
    <div style={{width: '100%', height: '100%', overflow: "hidden", position: "relative"}}>
      <FlowZoom />
      {children}
    </div> 
  )
}

export default Flow