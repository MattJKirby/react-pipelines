import React from "react"
import { useEffect, useState } from "react"
import FlowCanvas from "./canvas"
import FlowZoom from "./zoom"

export const Flow = () => {
  const [transform, setTransform] = useState({k: 1, x: 0, y: 0})
  const nodeList = [
    {id: 0, type: 'default', name: 'node1', footer: "This is some footer content", outputs: ['Output 1', ' Output 2']}, 
    {id: 1, text: 'node2', name: 'Node2', outputs: ['Output 1']}]

  const edgeList = [
    {sourceNodeId: 0, sourceNodeOutput: 'Output 1', targetNodeId: 1, targetNodeInput: 'Input 1'}
  ]


  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}}>
      <FlowZoom setTransform={setTransform} nodeList={nodeList} />
      <FlowCanvas transform={transform} gap={40} size={1} />
    </div> 
  )
}

export default Flow