import React from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { Handle } from "../Handles/Handle";
import { INodeData } from "./INodeData";


const TestNode = () => {
  const node = useNodeContext() as INodeData

  return (
    <div>
      TestNode
      <Handle id="target" type="target" />
    </div>
  )
}

TestNode.displayName = 'TestNode';

export default TestNode