import React, { useMemo, useState } from "react"
import GraphCanvas from "../../src/Components/Canvas"
import Graph from "../../src/Components/Graph"
import GraphProvider from "../../src/Components/GraphProvider"
import TestNode from "../../src/Components/Node/TestNode"


const initialNodeList = [
  {id: '0', type: 'default', position: {x: 50, y: 50}, data: {label: "node1"}}, 
  {id: '1', type: 'TestNode', position: {x: 100, y: 50}, data: {test: "node3"}},
  {id: '2', type: 'default', position: {x: 50, y: 100}, data: {label: "node2"}}, 
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

  return ( <div>
    <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "500px"}}>
      <GraphProvider>
        <Graph nodes={nodes} nodeTypes={nodeTypes} edges={edges}>
          <GraphCanvas gap={40} size={1} />
        </Graph>
      </GraphProvider>
    </div>

     <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "500px"}}>
        <Graph id="abc" nodes={nodes} nodeTypes={nodeTypes} edges={edges} enableDraggableNodes={false}>
          <GraphCanvas gap={40} size={1} />
        </Graph>
      </div>

  </div>
    
    
  )

}
export default GraphUI