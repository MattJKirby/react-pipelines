import React from "react"
import { Handle } from "../Handles/Handle";
import { INodeData } from "./INodeData";

interface TestNodeProps {
  nodeData: INodeData
}

const TestNode = ({nodeData}: TestNodeProps) => {

  return (
    <div>
      TestNode
      <Handle />
    </div>
  )
}

TestNode.displayName = 'TestNode';

export default TestNode