import React from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { Handle } from "../Handles/Handle";
import { INodeData } from "./INodeData";

const DefaultNode = () => {
  const node = useNodeContext() as INodeData

  return (
    <div>
      {node.name}
      <Handle id="source"/>
    </div>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default DefaultNode