import React from "react"
import { INodeData } from "./INodeData";

interface TestNodeProps {
  nodeData: INodeData
}

const TestNode = ({nodeData}: TestNodeProps) => {

  return (
    <div>
      TestNode
    </div>
  )
}

TestNode.displayName = 'TestNode';

export default TestNode