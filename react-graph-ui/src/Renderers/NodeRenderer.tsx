import React, { useEffect } from "react"
import { ComponentType } from "react"
import NodeContainer from "../Containers/NodeContainer"
import { EdgeRenderer } from "./EdgeRenderer"
import { useNodeStore } from "../Stores/NodeStore"
import DefaultNode from "../Components/Node/DefaultNode"
import { useGraphStore } from "../Stores/GraphStore"


export const NodeRenderer = () => {
  const nodes = useNodeStore((state) => state.nodes);
  const userNodeTypes = useGraphStore((state) => state.userNodeTypes)
  const nodeTypes: { [key: string]: ComponentType<any> } = {...{default: DefaultNode}, ...userNodeTypes}

  return (
    <div style={{position: 'relative', display: 'flex'}}>
        {nodes.map(node => {
          const NodeType = nodeTypes[node.type] as ComponentType<any> || nodeTypes['default']
          
          return (
            <NodeContainer key={node.id} nodeData={node}>
                <NodeType nodeData={node}/>
            </NodeContainer>
          )
        })}
    </div>
  )
}

export default NodeRenderer