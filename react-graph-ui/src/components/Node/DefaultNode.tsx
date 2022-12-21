import React from "react"
import { Handle } from "../Handles/Handle";
import { INodeData } from "./INodeData";

interface DefaultNodeProps {
  nodeData: INodeData
}

const DefaultNode = ({nodeData}: DefaultNodeProps) => {

  return (
    <div>
      {nodeData.name}
      <Handle />
    </div>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default DefaultNode