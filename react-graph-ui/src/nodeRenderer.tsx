import React from "react"
import { ComponentType } from "react"
import Node from "./Node/Node"
import { EdgeRenderer } from "./edgeRenderer"
import { useNodeStore } from "./stores/nodeStore"
import DefaultNode from "./Node/DefaultNode"
import { useGraphStore } from "./stores/GraphStore"


export const NodeRenderer = () => {
  const nodes = useNodeStore((state) => state.nodes);
  const userNodeTypes = useGraphStore((state) => state.userNodeTypes)
  const nodeTypes: { [key: string]: ComponentType<any> } = {...{default: DefaultNode}, ...userNodeTypes}

  return (
    <div style={{position: 'relative', display: 'flex'}}>
        {nodes.map(node => {
          const NodeType = nodeTypes[node.type] as ComponentType<any> || nodeTypes['default']
          return(
            <Node key={node.id} nodeData={node}>
                <NodeType nodeData={node}/>
            </Node>
          )
        })}
        <EdgeRenderer></EdgeRenderer>
    </div>
  )
}

export default NodeRenderer