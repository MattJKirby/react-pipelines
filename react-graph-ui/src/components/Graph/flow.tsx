import React, { ComponentType, useRef } from "react"
import { useEffect } from "react"
import { useNodeStore } from "../../Stores/NodeStore"
import ZoomContainer from "../../Containers/ZoomContainer"
import { INodeData } from "../Node/INodeData"
import { useGraphStore } from "../../Stores/GraphStore"
import NodeRenderer, { NodeTypeProps } from "../../Renderers/NodeRenderer"
import { EdgeRenderer } from "../../Renderers/EdgeRenderer"
import { IEdgeData } from "../Edges/IEdgeData"
import { useEdgeStore } from "../../Stores/EdgeStore"

interface FlowProps {
  children: React.ReactNode;
  nodes: INodeData[];
  nodeTypes: { [key: string]: ComponentType<NodeTypeProps> };
  edges: IEdgeData[];
}

/**
 * Graph entrypoint component
 * @param param0 
 * @returns 
 */
export const Flow = ({children, nodes, nodeTypes, edges}: FlowProps) => {
  const nodesRef = useRef(useNodeStore.getState().nodes)
  const edgesRef = useRef(useEdgeStore.getState().edges)
  const addNode = useNodeStore((state) => state.addNode)
  const addEdge = useEdgeStore((state) => state.addEdge)
  const setUserNodeTypes = useGraphStore((state) => state.setUserNodeTypes)


  /**
   * Enables the nodesRef to suscriube to state.nodes
   */
  useEffect(() => useNodeStore.subscribe(
    state => (nodesRef.current = state.nodes)
  ), [])

  /**
   * When nodeData is modified, publish changes to the NodeStore
   */
  useEffect(() => {
    nodes.forEach(node => {
      if(!nodesRef.current.some(n => n.id === node.id)){
        addNode(node)
      }
    })
  }, [addNode, nodes, nodesRef])

  /**
   * Publish nodeTypes to the store
   */
  useEffect(() => {
    setUserNodeTypes(nodeTypes);
    }, [setUserNodeTypes, nodeTypes]);

  /**
   * Subscribe to edge store to enable edgeRef to follow edgeStore.
   */
  useEffect(() => useEdgeStore.subscribe(
    state => (edgesRef.current = state.edges)
  ), [])

  /**
   * On EdgeData change, add nex edges to EdgeStore
   */
  useEffect(() => {
    edges.forEach(edge => {
      if(!edgesRef.current.find(e => e.edgeId === edge.edgeId)){
        addEdge(edge)
      }
    })
  })

  return (
    <div style={{width: '100%', height: '100%', overflow: "hidden", position: "relative"}}>
      <ZoomContainer>
        <NodeRenderer />
        <EdgeRenderer />
      </ZoomContainer>
      {children}
    </div> 
  )
}

export default Flow