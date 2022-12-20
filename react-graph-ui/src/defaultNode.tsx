import Draggable from "./draggable"
import styles from '../styles/flow-ui/DefaultNode.module.css'
import { NodeOutput } from "./components/outputs/nodeOutput"
import { createRef, useEffect, useRef, useState } from "react"
import React from "react"

interface DefaultNodeProps {
  node: any
  transform: any
}

const DefaultNode = ({node}: DefaultNodeProps) => {
  const nodeRef = createRef<HTMLDivElement>()
  const [position, setPosition] = useState<{x: number, y: number}>({x: 0, y: 0})
  
  const updatePosition = (x: number, y: number) => {
    if(x !== position.x && y !== position.y){
      setPosition({x: x, y: y})
    }
  }



  return (
    <Draggable key={node.id} setPosition={updatePosition}>
      <div className={styles.nodeContainer} ref={nodeRef}>
        {node.name}
      </div>
    </Draggable>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default DefaultNode