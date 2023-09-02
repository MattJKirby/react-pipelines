"use client";

import { Controls, Graph, GraphCanvas, GraphProvider, IEdge, INode, MiniMap, TestNode, useEdgeStore, useNodesStore } from "@mattjkirby/react-pipelines";
import React, { useCallback, useMemo } from "react"


const initialNodeList: INode<any>[] = [
  {id: '0', type: 'default', position: {x: 500, y: 150}, data: {label: "node1"}, enableSelect: false}, 
  {id: '1', type: 'TestNode', position: {x: 1000, y: 200}, data: {label: "asdf", test: "node3"}},
  {id: '2', type: 'default', position: {x: 500, y: 250}, data: {label: "asdf"}}
]

  const initialEdgeList: IEdge[] = [
    {id: "edge-0-1", sourceNodeId: '0', sourceNodeOutput: 'source', targetNodeId: '1', targetNodeInput: 'target', type: 'default', enableSelect: false},
    {id: "edge-2-1", sourceNodeId: '2', sourceNodeOutput: 'source', targetNodeId: '1', targetNodeInput: 'target', type: 'default', pathType: 'bezier'}
  ]

/**
 * Page for displaing graph UI components
 * @returns 
 */
const Page = () => {
  const nodeTypes = useMemo(() => ({ TestNode: TestNode }), []);

  const [nodes, setNodes, onNodesChange, nodeChanges] = useNodesStore(initialNodeList);
  const [edges, setEdges, onEdgesChange, edgeChanges] = useEdgeStore(initialEdgeList)

  const addNode = useCallback(() => {
    setNodes([...nodes, {id: `${nodes.length}`, type: 'default', position: {x: 300, y: 200}, data: {test: "asdf"}}])
  }, [nodes, setNodes]);

  return ( <div>
    <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "400px"}}>
      <button onClick={addNode}>Add Node</button>
      <GraphProvider>
        <Graph 
          nodes={nodes} 
          nodeTypes={nodeTypes} 
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <MiniMap right/>
          <Controls top />
          <GraphCanvas gap={40} size={1} />
        </Graph>
      </GraphProvider>
    </div>

     {/* <div style={{overflow: "hidden", margin: "5rem", height: "500px"}}>
        <Graph 
          id="abc" 
          nodes={nodes} 
          nodeTypes={nodeTypes} 
          edges={edges} 
          enableDraggableNodes={false} 
          enableSelectableNodes={true}
          enableSelectableEdges={false}
          deleteKeyCode={"q"}
          deselectKeyCode={'s'}
          multiSelectionKeyCode={'a'}
          zoomExtent={[0.5,2]}
          translateExtent={[[-Infinity,Infinity], [-Infinity,Infinity]]}
          >
          <MiniMap top right/>
          <Controls top />
          <GraphCanvas gap={40} size={1} style='grid'/>
        </Graph>
      </div> */}


  </div>
    
  )

}
export default Page;



