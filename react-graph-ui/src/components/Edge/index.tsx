import { useEffect, useState } from "react"
import EdgeDataContext from "../../Contexts/EdgeDataContext"
import { useNodeIOStore } from "../../Stores/NodeIOStore"
import { IHandleData } from "../Handle/IHandleData"
import { IEdgeData } from "./IEdgeData"

interface EdgeProps {
  children: React.ReactNode
  edge: IEdgeData
}

export const Edge = ({children, edge}: EdgeProps) => {
  const nodeHandles = useNodeIOStore((state) => state.nodeHandles)
  const [edgeHandles, setEdgeHandles] = useState<{source: IHandleData, target: IHandleData}>()

  useEffect(() => {
    const source = nodeHandles.find(s => s.nodeId === edge.sourceNodeId && s.id === edge.sourceNodeOutput)
    const target = nodeHandles.find(t => t.nodeId === edge.targetNodeId && t.id === edge.targetNodeInput)
    if(source && target){
      setEdgeHandles({source, target})
    }
  }, [edge.sourceNodeId, edge.sourceNodeOutput, edge.targetNodeId, edge.targetNodeInput, nodeHandles])

  return (
   <EdgeDataContext.Provider value={edgeHandles}>
    {children}
   </EdgeDataContext.Provider>
  )
}