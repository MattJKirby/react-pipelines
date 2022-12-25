import React, { useMemo, useState } from "react"
import FlowCanvas from "../../src/canvas"
import Graph from "../../src/Components/Graph"
import TestNode from "../../src/Components/Node/TestNode"

const initialNodeList = [
  {id: 0, type: 'default', name: 'node1', position: {x: 50, y: 50}}, 
  {id: 1, type: 'TestNode', name: 'Node2', position: {x: 100, y: 50}},
  {id: 2, type: 'default', name: 'node3', position: {x: 50, y: 100}}, 
]

  const initialEdgeList = [
    {id: "edge-1", sourceNodeId: 0, sourceNodeOutput: 'source', targetNodeId: 1, targetNodeInput: 'target'},
    {id: "edge-2", sourceNodeId: 2, sourceNodeOutput: 'source', targetNodeId: 1, targetNodeInput: 'target'}
  ]

/**
 * Page for displaing graph UI components
 * @returns 
 */
const GraphUI = () => {
  const [nodes, setNodes] = useState(initialNodeList)
  const [edges, setEdges] = useState(initialEdgeList)
  const nodeTypes = useMemo(() => ({ TestNode: TestNode }), []);

  const newNode = () => {
    const newNode = { id: nodes.length, type: 'default', name: 'asdf', position: {x: 300, y: 40}}
    setNodes([...nodes, newNode])
  }

  return (
    <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "500px"}}>
      <button onClick={newNode}>Add Node</button> 
      <Graph nodes={nodes} nodeTypes={nodeTypes} edges={edges}>
        <FlowCanvas gap={40} size={1} />
      </Graph>
    </div>
    
  )

}
export default GraphUI