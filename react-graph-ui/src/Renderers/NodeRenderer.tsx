import React from "react"
import { ComponentType } from "react"
import Node from "../Components/Node"
import { useNodeStore } from "../Stores/NodeStore"
import DefaultNode from "../Components/Node/DefaultNode"
import { useGraphStore } from "../Stores/GraphStore"

export interface NodeTypeProps {

}


export const NodeRenderer = () => {
  const nodes = useNodeStore((state) => state.getNodes());
  const userNodeTypes = useGraphStore((state) => state.userNodeTypes)
  const nodeTypes: { [key: string]: ComponentType<NodeTypeProps> } = {...{default: DefaultNode}, ...userNodeTypes}

  return (
    <div style={{position: 'relative', display: 'flex'}}>
        {nodes.map(node => {
          const NodeType = nodeTypes[node.type] as ComponentType<NodeTypeProps> || nodeTypes['default']
          
          return (
            <Node key={node.id} node={node}>
                <NodeType />
            </Node>
          )
        })}
    </div>
  )
}

export default NodeRenderer