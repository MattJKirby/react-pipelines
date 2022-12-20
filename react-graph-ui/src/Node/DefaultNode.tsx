import React from "react"
import { INodeData } from "./INodeData";

interface DefaultNodeProps {
  nodeData: INodeData
}

const DefaultNode = ({nodeData}: DefaultNodeProps) => {

  return (
    <div>
      {nodeData.name}
    </div>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default DefaultNode