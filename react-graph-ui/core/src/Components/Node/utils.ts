import { IElementSelectionHandlerProps } from "../../Types/graph";

export const elementSelectionHandler = ({
  id,
  store,
  unselect = false,
  disabled = true
}: IElementSelectionHandlerProps) => {
  const { updateSelectedNodes, resetSelectedNodes, updateSelectedEdges, resetSelectedEdges, nodeInternals, edgeInternals, multiSelectionActive } = store.getState()
  const element = nodeInternals.get(id) || edgeInternals.get(id)

  if(!disabled && element){
    if (!multiSelectionActive) {
      resetSelectedNodes();
      resetSelectedEdges();
    }
    
    const updateFn = nodeInternals.has(element.id) ? updateSelectedNodes : updateSelectedEdges;
    updateFn([{ id, selected: !element.selected && !unselect }]);

    if (element.selected && !multiSelectionActive) {
      resetSelectedNodes();
      resetSelectedEdges();
      const updateFn = nodeInternals.has(element.id) ? updateSelectedNodes : updateSelectedEdges;
      updateFn([{ id, selected: true }]);
    }

  }
}