import { useEffect } from "react";
import useKeyPress from "./useKeyPress";
import { useStoreApi } from "./useStoreApi";

type GlobalKeyHandlerProps = {
  unselectKeyCode: string;
  deleteKeyCode: string;
  multiSelectKey: string;
}

/**
 * Global key handler for deselecting, deletion and multi-select.
 * @param param0 
 */
export const UseGlobalKeyHandler = ({
  unselectKeyCode,
  deleteKeyCode,
  multiSelectKey
}: GlobalKeyHandlerProps) => {
  const store = useStoreApi();
  const unselectKeyPressed = useKeyPress(unselectKeyCode);
  const deleteKeyPressed = useKeyPress(deleteKeyCode);
  const multiSelectKeyPressed = useKeyPress(multiSelectKey);

  useEffect(() => {
    if(deleteKeyPressed){
      const { getNodes, removeNode } = store.getState();
      const selectedNodes = getNodes().filter(n => n.selected);

      selectedNodes.forEach(n => removeNode([{id: n.id}]))
    }
  }, [deleteKeyPressed, store])

  useEffect(() => {
    if(unselectKeyPressed){
      const { resetSelectedNodes, resetSelectedEdges  } = store.getState();
      resetSelectedNodes();
      resetSelectedEdges();
    }
  }, [store, unselectKeyPressed]);

  useEffect(() => {
    store.setState({multiSelectionActive: multiSelectKeyPressed})
  }, [multiSelectKeyPressed, store])
}

export default UseGlobalKeyHandler;