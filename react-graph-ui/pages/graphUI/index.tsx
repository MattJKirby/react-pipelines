import React, { useEffect, useState } from "react"
import FlowCanvas from "../../src/canvas"
import Flow from "../../src/flow"
import { useNodeStore } from "../../src/stores/nodeStore"

/**
 * Page for displaing graph UI components
 * @returns 
 */
const GraphUI = () => {
  const initialNodeList = [
    {id: 0, type: 'default', name: 'node1', position: {x: 50, y: 50}}, 
    {id: 1, type: 'default', name: 'Node2', position: {x: 100, y: 50}, outputs: ['Output 1']}]

    const edgeList = [
      {sourceNodeId: 0, sourceNodeOutput: 'Output 1', targetNodeId: 1, targetNodeInput: 'Input 1'}
    ]

  const [nodes, setNodes] = useState(initialNodeList)

  const newNode = () => {
    const newNode = { id: nodes.length, type: 'default', name: 'asdf'}
    setNodes([...nodes, newNode])
  }

  return (
    <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "500px"}}>
      <button onClick={newNode}>Add Node</button> 
      <Flow nodes={nodes}>
        <FlowCanvas gap={40} size={1} />
      </Flow>    
    </div>
    
  )

}
export default GraphUI