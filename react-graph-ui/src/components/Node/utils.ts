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
  const { addSelectedNodes, removeSelectedNodes, nodeInternals } = store.getState()
  const node = nodeInternals.get(id);

  if(!disabled){
    if(!node?.selected){
      removeSelectedNodes(Array.from(nodeInternals.keys()).map(n => ({id: n, selected: false})));
      addSelectedNodes([{id, selected: true}]);
    } else if (unselect){
      removeSelectedNodes([{id, selected: false}]);
    }
  }
}