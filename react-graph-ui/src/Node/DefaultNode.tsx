import React from "react"
import { INodeData } from "./INodeData";

interface DefaultNodeProps {
  nodeData: INodeData
}

const DefaultNode = ({nodeData}: DefaultNodeProps) => {

  return (
    <div>
      fksjdhkjsd
    </div>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default DefaultNode