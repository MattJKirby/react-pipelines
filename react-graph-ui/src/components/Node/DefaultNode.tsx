import React from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { INode } from "../../Types";
import { Handle } from "../Handle";

const DefaultNode = () => {
  const node = useNodeContext() as INode

  return (
    <div>
      {node.name}
      <Handle id="source"/>
    </div>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default DefaultNode