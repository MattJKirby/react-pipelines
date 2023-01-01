import React, { ComponentType, useRef, MouseEvent } from "react"
import { useEffect } from "react"
import ZoomContainer from "../../Containers/ZoomContainer"
import NodeRenderer, { NodeTypeProps } from "../../Renderers/NodeRenderer"
import { EdgeRenderer } from "../../Renderers/EdgeRenderer"
import { InteractionRenderer } from "../../Renderers/InteractionRenderer"
import { calculateScaledMousePosition } from "./utils"
import { useStore } from "../../Hooks/useStore"
import { IEdge, IGraphState, INode } from "../../Types"
import { useStoreApi } from "../../Hooks/useStoreApi"

interface GraphProps {
  children: React.ReactNode;
  nodes: INode[];
  nodeTypes: { [key: string]: ComponentType<NodeTypeProps> };
  edges: IEdge[];
}

const selector = (s: IGraphState) => ({
  graphNodes: s.nodes,
  transform: s.graphTransform,
  handleInteraction: s.handleInteraction,
  setHandleInteraction: s.setHandleInteraction,
  resetHandleInteraction: s.resetHandleInteraction,
  setCustomNodeTypes: s.setCustomNodeTypes,
  addNode: s.addNode,
  addEdge: s.addEdge,
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
  const edgesRef = useRef(useStoreApi().getState().edges)
  const {transform, handleInteraction, setHandleInteraction, resetHandleInteraction, setCustomNodeTypes, addNode, addEdge} = useStore(selector)
  
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
  useEffect(() => store.subscribe(
    state => (edgesRef.current = state.edges)
  ), [store])

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

  const handleMouseMove = (e: MouseEvent) => {
    if(handleInteraction !== undefined && flowRef.current !== null){
      setHandleInteraction({...handleInteraction, mousePosition: calculateScaledMousePosition(e, flowRef.current, transform)})
    }
  }

  return (
    <div
      ref={flowRef}
      onMouseUp={() => resetHandleInteraction()}
      onMouseMove={(e: MouseEvent) => handleMouseMove(e)}
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