import React, { Children } from "react"
import { useEffect, useState } from "react"
import FlowCanvas from "./canvas"
import { useNodeStore } from "./stores/nodeStore"
import FlowZoom from "./zoom"

export const Flow = ({children}) => {
  const nodeList = [
    {id: 0, type: 'default', name: 'node1', footer: "This is some footer content", outputs: ['Output 1', ' Output 2']}, 
    {id: 1, text: 'node2', name: 'Node2', outputs: ['Output 1']}]

  const edgeList = [
    {sourceNodeId: 0, sourceNodeOutput: 'Output 1', targetNodeId: 1, targetNodeInput: 'Input 1'}
  ]
  

  const nodes = useNodeStore((state) => state.nodes)

  console.log(nodes)


  return (
    <div style={{width: '100%', height: '100%', overflow: "hidden", position: "relative"}}>
      <FlowZoom nodeList={nodeList} />
      {children}
    </div> 
  )
}

export default Flow