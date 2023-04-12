import { useEffect } from "react";
import useKeyPress from "./useKeyPress";
import { useStoreApi } from "./useStoreApi";

type GlobalKeyHandlerProps = {
  deselectKeyCode?: string;
  deleteKeyCode?: string;
  multiSelectionKeyCode?: string;
}

/**
 * Global key handler for deselecting, deletion and multi-select.
 * @param param0 
 */
export const UseGlobalKeyHandler = ({
  deselectKeyCode = 'Escape',
  deleteKeyCode = 'Backspace',
  multiSelectionKeyCode = 'Shift'
}: GlobalKeyHandlerProps) => {
  const store = useStoreApi();
  const deselectKeyPressed = useKeyPress(deselectKeyCode);
  const deleteKeyPressed = useKeyPress(deleteKeyCode);
  const multiSelectKeyPressed = useKeyPress(multiSelectionKeyCode);

  useEffect(() => {
    if(deleteKeyPressed){
      const { getNodes, getEdges, removeNode, removeEdge } = store.getState();
      const selectedNodes = getNodes().filter(n => n.selected);
      const selectedEdge = getEdges().filter(e => e.selected);

      selectedNodes.forEach(n => removeNode([{id: n.id}]));
      selectedEdge.forEach(e => removeEdge([{id: e.id}]));
    }
  }, [deleteKeyPressed, store])

  useEffect(() => {
    if(deselectKeyPressed){
      const { resetSelectedNodes, resetSelectedEdges  } = store.getState();
      resetSelectedNodes();
      resetSelectedEdges();
    }
  }, [store, deselectKeyPressed]);

  useEffect(() => {
    store.setState({multiSelectionActive: multiSelectKeyPressed})
  }, [multiSelectKeyPressed, store])
}

export default UseGlobalKeyHandler;