import React, { useEffect } from "react"
import FlowCanvas from "../../src/canvas"
import Flow from "../../src/flow"
import { useNodeStore } from "../../src/stores/nodeStore"

/**
 * Page for displaing graph UI components
 * @returns 
 */
const graphUI = () => {

  const addNode = useNodeStore((state) => state.addNode)

  const initialNodeList = [
    {id: 0, type: 'default', name: 'node1', }, 
    {id: 1, type: 'default', name: 'Node2', outputs: ['Output 1']}]

  const edgeList = [
    {sourceNodeId: 0, sourceNodeOutput: 'Output 1', targetNodeId: 1, targetNodeInput: 'Input 1'}
  ]

  const newNode = () => {
    const newNode = { id: initialNodeList.length, type: 'default', name: 'asdf'}
    addNode(newNode)

    console.log(initialNodeList, true)
  }

  return (
    <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "500px"}}>
      <button onClick={newNode}>Add Node</button> 
      <Flow nodes={initialNodeList}>
        <FlowCanvas gap={40} size={1} />
      </Flow>    
    </div>
    
  )

}
export default graphUI