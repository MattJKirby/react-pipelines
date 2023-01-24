import { StoreApi } from "zustand"
import { IGraphState } from "../../Types"

interface INodeClickHandlerProps {
  id: string,
  unselect?: boolean
  store: {
    getState: StoreApi<IGraphState>['getState'],
    setState: StoreApi<IGraphState>['setState'],
  }
}

export const nodeClickHandler = ({id, store, unselect = false}: INodeClickHandlerProps) => {
  const { addSelectedNode, removeSelectedNodes,getNodeById } = store.getState()
  const node = getNodeById(id);

  if(!node?.selected){
    removeSelectedNodes([], true)
    addSelectedNode(id);
  } else if (unselect){
    removeSelectedNodes([id]);
  }
}