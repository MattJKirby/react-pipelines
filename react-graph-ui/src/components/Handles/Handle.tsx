import React from "react"
import { useNodeId } from "../../NodeIdContext"

export const Handle = () => {

  const nodeId = useNodeId() as string;

  return (
    <div style={{position: "relative"}}>
      x
      {nodeId}
    </div>
  )
}