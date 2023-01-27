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
  const { addSelectedNode, removeSelectedNodes,getNodeById } = store.getState()
  const node = getNodeById(id);

  if(!node?.selected && !disabled){
    removeSelectedNodes([], true)
    addSelectedNode(id);
  } else if (unselect){
    removeSelectedNodes([id]);
  }
}