import React, { Children } from "react"
import { useEffect, useState } from "react"
import FlowCanvas from "./canvas"
import { useNodeStore } from "./stores/nodeStore"
import FlowZoom from "./zoom"
import { Node } from "./Node/Node"

interface FlowProps {
  children: React.ReactNode;
  nodes: Node[]
}

export const Flow = ({children, nodes}: FlowProps) => {
  const addNode = useNodeStore((state) => state.addNode)
  const storedNodes = useNodeStore((state) => state.nodes)

 
    nodes.forEach(node => {
      if(storedNodes.filter(n => n.id === node.id).length < 1) {
          addNode(node)
      }
    })

    useEffect(() => {
      nodes.forEach(node => {
        addNode(node)
      })
      storedNodes
    }, [addNode, nodes])
  
 

  return (
    <div style={{width: '100%', height: '100%', overflow: "hidden", position: "relative"}}>
      {/* NodeList is not required */}
      <FlowZoom nodeList={nodes} />
      {children}
    </div> 
  )
}

export default Flow