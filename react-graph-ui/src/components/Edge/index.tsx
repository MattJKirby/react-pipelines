import { useEffect, useState } from "react"
import EdgeDataContext from "../../Contexts/EdgeDataContext"
import { IHandleData } from "../Handle/IHandleData"
import { IEdgeData } from "./IEdgeData"

interface EdgeProps {
  children: React.ReactNode
  edge: IEdgeData
  source: IHandleData
  target: IHandleData
}

export const Edge = ({children, edge, source, target}: EdgeProps) => {
  const [edgeHandles, setEdgeHandles] = useState<{source: IHandleData, target: IHandleData}>({source, target})

  useEffect(() => {
    if(source && target){
      setEdgeHandles({source, target})
    }
  }, [source, target, setEdgeHandles, edge.id])

  return (
   <EdgeDataContext.Provider value={{edge, ...edgeHandles}}>
    {children}
   </EdgeDataContext.Provider>
  )
}