import Draggable from "./draggable"
import styles from '../styles/flow-ui/DefaultNode.module.css'
import { NodeOutput } from "./components/outputs/nodeOutput"
import { createRef, useEffect, useRef, useState } from "react"
import React from "react"
import { useNodeStore } from "./stores/nodeStore"

interface DefaultNodeProps {
  node: any
  transform: any
}

const DefaultNode = ({node}: DefaultNodeProps) => {
  const nodeRef = createRef<HTMLDivElement>()
  const nodes = useNodeStore((state) => state.nodes)
  const updateStoredPosition = useNodeStore((state) => state.updateNodePosition)
  
  
  const updatePosition = (x: number, y: number) => {
    if(x !== node.position?.x && y !== node.position?.y){
      updateStoredPosition(node.id, x, y)
    }
  }

  return (
    <Draggable key={node.id} initPosition={node.position} updatePosition={updatePosition}>
      <div className={styles.nodeContainer} ref={nodeRef}>
        {node.name}
      </div>
    </Draggable>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default DefaultNode