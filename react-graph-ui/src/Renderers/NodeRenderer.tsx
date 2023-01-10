import React from "react"
import { ComponentType } from "react"
import Node from "../Components/Node"
import DefaultNode from "../Components/Node/DefaultNode"
import { IGraphState, INodeProps } from "../Types"
import { useStore } from "../Hooks/useStore"


const selector = (s: IGraphState) => ({
  nodes: s.nodes,
  customNodeTypes: s.customNodeTypes
});

export const NodeRenderer = () => {
  const {customNodeTypes, nodes} = useStore(selector)
  const nodeTypes: { [key: string]: ComponentType<INodeProps> } = {...{default: DefaultNode}, ...customNodeTypes}

  return (
    <div style={{position: 'relative', display: 'flex'}}>
        {nodes.map(node => {
          const NodeType = nodeTypes[node.type] as ComponentType<INodeProps> || nodeTypes['default']
          
          return (
            <Node key={node.id} node={node}>
                <NodeType data={node.data} />
            </Node>
          )
        })}
    </div>
  )
}

export default NodeRenderer