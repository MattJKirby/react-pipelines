import React from "react"
import { ComponentType } from "react"
import Node from "../Components/Node"
import DefaultNode from "../Components/Node/DefaultNode"
import { IGraphState } from "../Types"
import { useStore } from "../Hooks/useStore"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NodeTypeProps {

}

const selector = (s: IGraphState) => ({
  nodes: s.nodes,
  customNodeTypes: s.customNodeTypes
});

export const NodeRenderer = () => {
  const {customNodeTypes, nodes} = useStore(selector)
  const nodeTypes: { [key: string]: ComponentType<NodeTypeProps> } = {...{default: DefaultNode}, ...customNodeTypes}

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