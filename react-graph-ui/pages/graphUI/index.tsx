import React, { useMemo, useState } from "react"
import GraphCanvas from "../../src/Components/Canvas"
import Graph from "../../src/Components/Graph"
import GraphProvider from "../../src/Components/GraphProvider"
import TestNode from "../../src/Components/Node/TestNode"


const initialNodeList = [
  {id: '0', type: 'default', name: 'node0', position: {x: 50, y: 50}}, 
  {id: '1', type: 'TestNode', name: 'Node1', position: {x: 100, y: 50}},
  {id: '2', type: 'default', name: 'node2', position: {x: 50, y: 100}}, 
]

  const initialEdgeList = [
    {id: "edge-0-1", sourceNodeId: '0', sourceNodeOutput: 'source', targetNodeId: '1', targetNodeInput: 'target', type: 'default'},
    {id: "edge-2-1", sourceNodeId: '2', sourceNodeOutput: 'source', targetNodeId: '1', targetNodeInput: 'target', type: 'default'}
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
    const newNode = { id: `${nodes.length}`, type: 'default', name: 'asdf', position: {x: 300, y: 40}}
    setNodes([...nodes, newNode])
  }

  return ( <div>
    <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "500px"}}>
      <button onClick={newNode}>Add Node</button> 
      <GraphProvider>
        <Graph nodes={nodes} nodeTypes={nodeTypes} edges={edges}>
          <GraphCanvas gap={40} size={1} />
        </Graph>
      </GraphProvider>
    </div>

     <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "500px"}}>
      <button onClick={newNode}>Add Node</button> 
        <Graph id="abc" nodes={nodes} nodeTypes={nodeTypes} edges={edges} enableDraggableNodes={false}>
          <GraphCanvas gap={40} size={1} />
        </Graph>
      </div>

  </div>
    
    
  )

}
export default GraphUI