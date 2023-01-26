import { INodeClickHandlerProps } from "../../Types";

/**
 * Node onClick handler
 * @param param0 
 */
export const nodeClickHandler = ({
  id, 
  store,
  unselect = false
}: INodeClickHandlerProps) => {
  const { addSelectedNode, removeSelectedNodes,getNodeById } = store.getState()
  const node = getNodeById(id);

  if(!node?.selected){
    removeSelectedNodes([], true)
    addSelectedNode(id);
  } else if (unselect){
    removeSelectedNodes([id]);
  }
}