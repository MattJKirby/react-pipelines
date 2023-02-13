import React, { useCallback, useEffect, useMemo } from "react"
import GraphCanvas from "../../src/Components/Canvas"
import Graph from "../../src/Components/Graph"
import GraphProvider from "../../src/Components/GraphProvider"
import TestNode from "../../src/Components/Node/TestNode"
import { useEdgeStore, useNodesStore } from "../../src/Hooks/useStoreItemState"
import { INode } from "../../src/Types"


const initialNodeList: INode<any>[] = [
  {id: '0', type: 'default', position: {x: 50, y: 50}, data: {label: "node1"}, enableSelect: false}, 
  {id: '1', type: 'TestNode', position: {x: 100, y: 50}, data: {label: "asdf", test: "node3"}},
  {id: '2', type: 'default', position: {x: 50, y: 100}, data: {label: "asdf"}}
]

  const initialEdgeList = [
    {id: "edge-0-1", sourceNodeId: '0', sourceNodeOutput: 'source', targetNodeId: '1', targetNodeInput: 'target', type: 'default', enableSelect: false},
    {id: "edge-2-1", sourceNodeId: '2', sourceNodeOutput: 'source', targetNodeId: '1', targetNodeInput: 'target', type: 'default'}
  ]

/**
 * Page for displaing graph UI components
 * @returns 
 */
const GraphUI = () => {
  const nodeTypes = useMemo(() => ({ TestNode: TestNode }), []);

  const [nodes, setNodes, onNodesChange, nodeChanges] = useNodesStore(initialNodeList);
  const [edges, setEdges, onEdgesChange, edgeChanges] = useEdgeStore(initialEdgeList)

  const addNode = useCallback(() => {
    setNodes([...nodes, {id: `${nodes.length}`, type: 'default', position: {x: 300, y: 200}, data: {test: "asdf"}}])
  }, [nodes, setNodes]);

  return ( <div>
    <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "500px"}}>
      <button onClick={addNode}>Add Node</button>
      <GraphProvider>
        <Graph 
          nodes={nodes} 
          nodeTypes={nodeTypes} 
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <GraphCanvas gap={40} size={1} />
        </Graph>
      </GraphProvider>
    </div>

     <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "500px"}}>
        <Graph 
          id="abc" 
          nodes={nodes} 
          nodeTypes={nodeTypes} 
          edges={edges} 
          enableDraggableNodes={false} 
          enableSelectableNodes={false}
          >
          <GraphCanvas gap={40} size={1} style='grid'/>
        </Graph>
      </div>

  </div>
    
    
  )

}
export default GraphUI