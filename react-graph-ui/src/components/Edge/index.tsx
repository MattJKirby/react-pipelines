import { memo } from "react"
import EdgeDataContext from "../../Contexts/EdgeDataContext"
import { IEdgeProps } from "../../Types"

const Edge = ({
  children, 
  edge, 
  source, 
  target
}: IEdgeProps) => {

  return (
   <EdgeDataContext.Provider value={{edge, ...{source, target}}}>
    {children}
   </EdgeDataContext.Provider>
  )
}

export default memo(Edge);