import { INodeSelectHandlerProps } from "../../Types";

/**
 * Node onClick handler
 * @param param0 
 */
export const nodeSelectHandler = ({
  id, 
  store,
  unselect = false,
  disabled = true,
}: INodeSelectHandlerProps) => {
  const { updateSelectedNodes, resetSelectedNodes, nodeInternals, multiSelectionActive } = store.getState()
  const node = nodeInternals.get(id);

  if(!disabled){
    if(!node?.selected){
      !multiSelectionActive ? resetSelectedNodes() : null;
      updateSelectedNodes([{id, selected: true}]);
    } else if (unselect){
      updateSelectedNodes([{id, selected: false}]);
    }
  }
}