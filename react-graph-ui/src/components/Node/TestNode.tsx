import React from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { Handle } from "../Handle";
import { INodeData } from "./INodeData";


const TestNode = () => {
  const node = useNodeContext() as INodeData

  return (
    <div>
      {node.name} (Test)
      <Handle id="target" type="target" />
    </div>
  )
}

TestNode.displayName = 'TestNode';

export default TestNode