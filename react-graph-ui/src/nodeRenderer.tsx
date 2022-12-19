import React from "react"
import { ComponentType, createElement, Key } from "react"
import DefaultNode from "./defaultNode"
import Draggable from "./draggable"
import { EdgeRenderer } from "./edgeRenderer"
import { useNodeStore } from "./stores/nodeStore"

interface NodeRendererProps {
  nodeList?: any
  edgeList?: any
  customNodeTypes?: any
}
export const NodeRenderer = ({nodeList, customNodeTypes, edgeList}: NodeRendererProps) => {
  const addNode = useNodeStore((state) => state.addNode)
  const nodeTypes: { [key: string]: ComponentType<any> } = {default: DefaultNode}

  return (
    <div style={{position: 'relative', display: 'flex'}}>
        {nodeList.map(node => {
          const NodeType = nodeTypes[node.type] as ComponentType<any> || nodeTypes['default']
          return(
            <NodeType key={node.id} node={node}/>
          )
        })}
        <EdgeRenderer></EdgeRenderer>
    </div>
  )
}

export default NodeRenderer