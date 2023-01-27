import React from "react"
import { ComponentType } from "react"
import Node from "../Components/Node"
import DefaultNode from "../Components/Node/DefaultNode"
import { IGraphState, INodeProps } from "../Types"
import { useStore } from "../Hooks/useStore"

const selector = (s: IGraphState) => ({
  nodes: s.getNodes(),
  customNodeTypes: s.customNodeTypes,
  enableNodeDrag: s.enableDraggableNodes,
  enableNodeSelect: s.enableSelectableNodes,
  selectNodeOnDrag: s.selectNodesOnDrag
});

export const NodeRenderer = () => {
  const store = useStore(selector);
  const nodeTypes: { [key: string]: ComponentType<INodeProps> } = {...{default: DefaultNode}, ...store.customNodeTypes}

  return (
    <div style={{position: 'relative', display: 'flex'}}>
        {store.nodes.map(node => {
          const NodeType = nodeTypes[node.type] as ComponentType<INodeProps> || nodeTypes['default'];
          const enableSelect = node.enableSelect === undefined ? true : node.enableSelect;
          const enableDrag = node.enableDrag === undefined ? true : node.enableDrag;
          
          return (
            <Node 
              key={node.id} 
              id={node.id}
              type={node.type}
              position={node.position}
              selected={node.selected}
              enableSelect={store.enableNodeSelect && enableSelect}
              enableDrag={store.enableNodeDrag && enableDrag}
              selectOnDrag={store.selectNodeOnDrag}
              >
                <NodeType 
                  id={node.id}
                  position={node.position}
                  selected={node.selected}
                  dragging={node.dragging}
                  data={node.data} 
                />
            </Node>
          )
        })}
    </div>
  )
}

export default NodeRenderer