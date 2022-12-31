import React from "react"
import { ComponentType } from "react"
import Node from "../Components/Node"
import { useNodeStore } from "../Stores/NodeStore"
import DefaultNode from "../Components/Node/DefaultNode"
import { IGraphState } from "../Types"
import { useStore } from "../Hooks/useStore"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NodeTypeProps {

}

const selector = (s: IGraphState) => ({
  customNodeTypes: s.customNodeTypes
});

export const NodeRenderer = () => {
  const nodes = useNodeStore((state) => state.getNodes());
  const {customNodeTypes} = useStore(selector)
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