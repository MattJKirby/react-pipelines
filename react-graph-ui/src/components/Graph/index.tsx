import React, { ComponentType, useRef } from "react"
import { useEffect } from "react"
import ZoomContainer from "../../Containers/ZoomContainer"
import NodeRenderer, { NodeTypeProps } from "../../Renderers/NodeRenderer"
import { EdgeRenderer } from "../../Renderers/EdgeRenderer"
import { IEdgeData } from "../Edge/IEdgeData"
import { useEdgeStore } from "../../Stores/EdgeStore"
import { useInteractionStore } from "../../Stores/InteractionStore"
import { InteractionRenderer } from "../../Renderers/InteractionRenderer"
import { calculateScaledMousePosition } from "./utils"
import { useStore } from "../../Hooks/useStore"
import { IGraphState, INode } from "../../Types"
import { useStoreApi } from "../../Hooks/useStoreApi"

interface GraphProps {
  children: React.ReactNode;
  nodes: INode[];
  nodeTypes: { [key: string]: ComponentType<NodeTypeProps> };
  edges: IEdgeData[];
}

const selector = (s: IGraphState) => ({
  graphNodes: s.nodes,
  transform: s.graphTransform,
  setCustomNodeTypes: s.setCustomNodeTypes,
  addNode: s.addNode,
});

/**
 * Graph entrypoint component
 * @param param0 
 * @returns 
 */
export const Graph = ({children, nodes, nodeTypes, edges}: GraphProps) => {
  const flowRef = useRef<HTMLDivElement>(null)
  const store = useStoreApi()
  const nodesRef = useRef(useStoreApi().getState().nodes)
  const edgesRef = useRef(useEdgeStore.getState().edgeDataList)
  const {transform, setCustomNodeTypes, addNode} = useStore(selector)
  const {edgeInteraction, setEdgeInteraction, resetEdgeInteraction} = useInteractionStore()
  const addEdge = useEdgeStore((state) => state.addEdge)
  
  /**
   * Enables the nodesRef to subscribe to state.nodes
   */
  useEffect(() => store.subscribe(
    state => (nodesRef.current = state.nodes)
  ), [store])

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
    setCustomNodeTypes(nodeTypes);
    }, [setCustomNodeTypes, nodeTypes]);

  /**
   * Subscribe to edge store to enable edgeRef to follow edgeStore.
   */
  useEffect(() => useEdgeStore.subscribe(
    state => (edgesRef.current = state.edgeDataList)
  ), [])

  /**
   * On EdgeData change, add nex edges to EdgeStore
   */
  useEffect(() => {
    edges.forEach(edge => {
      if(!edgesRef.current.find(e => e.id === edge.id)){
        addEdge(edge)
      }
    })
  })

  return (
    <div
      ref={flowRef}
      onMouseUp={() => resetEdgeInteraction()}
      onMouseMove={(e: React.MouseEvent) => edgeInteraction && flowRef.current && setEdgeInteraction({...edgeInteraction, mousePosition: calculateScaledMousePosition(e, flowRef.current, transform)})}
      style={{width: '100%', height: '100%', overflow: "hidden", position: "relative"}}
    >
      <ZoomContainer>
        <NodeRenderer />
        <EdgeRenderer />
        <InteractionRenderer />
      </ZoomContainer>
      {children}
    </div> 
  )
}

export default Graph