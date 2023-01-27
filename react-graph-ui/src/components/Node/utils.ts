import { INodeSelectHandlerProps } from "../../Types";

/**
 * Node onClick handler
 * @param param0 
 */
export const nodeSelectHandler = ({
  id, 
  store,
  unselect = false,
  disabled = false,
}: INodeSelectHandlerProps) => {
  const { addSelectedNode, removeSelectedNodes, nodeInternals } = store.getState()
  const node = nodeInternals.get(id);

  if(!node?.selected && !disabled){
    removeSelectedNodes([], true)
    addSelectedNode(id);
  } else if (unselect){
    removeSelectedNodes([id]);
  }
}