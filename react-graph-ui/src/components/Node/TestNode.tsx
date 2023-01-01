import React from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { INode } from "../../Types";
import { Handle } from "../Handle";

const TestNode = () => {
  const node = useNodeContext() as INode

  return (
    <div>
      {node.name} (Test)
      <Handle id="target" type="target" />
    </div>
  )
}

TestNode.displayName = 'TestNode';

export default TestNode