import { useEffect, useState } from "react"
import EdgeDataContext from "../../Contexts/EdgeDataContext"
import { IEdge, IHandle } from "../../Types"


interface EdgeProps {
  children: React.ReactNode
  edge: IEdge
  source: IHandle
  target: IHandle
}

export const Edge = ({children, edge, source, target}: EdgeProps) => {
  const [edgeHandles, setEdgeHandles] = useState<{source: IHandle, target: IHandle}>({source, target})

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