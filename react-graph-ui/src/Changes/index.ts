/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEdge, INode } from "../Types";
import { EdgeChangeTypes, NodeChangeTypes } from "../Types/changes";
import { internalsSymbol } from "../Utils";

const applyChanges = (changes: any[], elements: any[]): any[] => {
  const initElements: any[] = changes.filter((c) => c.type === 'add').map((c) => c.item);

  return elements.reduce((res: any[], item: any) => {
    const currentChanges = changes.filter((c) => c.id === item.id);

    if (currentChanges.length === 0) {
      res.push(item);
      return res;
    }

    const updateItem = { ...item };

    for (const currentChange of currentChanges) {
      if (currentChange) {
        switch (currentChange.type) {
          case 'position': {
            updateItem.position = currentChange.position;
            updateItem.dragging = currentChange.dragging;
            break;
          }
          case 'dom': {
            if(updateItem.dimensions !== undefined){
              updateItem.dimensions = currentChange.dimensions;
            }
            
            if(updateItem[internalsSymbol]?.handles !== undefined){
              updateItem[internalsSymbol].handles.source = currentChange.sourceHandles;
              updateItem[internalsSymbol].handles.target = currentChange.targetHandles;
            }
            break;
          }
          case 'select': {
            updateItem.selected = currentChange.selected;
            break;
          }
        }
      }
    }

    if(currentChanges.filter(c => c.type === 'remove').length === 0){
      res.push(updateItem);
    }
    return res;
  }, initElements);
}

export const applyNodeChanges = <NodeData>(changes: NodeChangeTypes[], nodes: INode<NodeData>[]): INode<NodeData>[] => {
  return applyChanges(changes, nodes) as INode<NodeData>[];
};

export const applyEdgeChanges = (changes: EdgeChangeTypes[], edges: IEdge[]): IEdge[] => {
  return applyChanges(changes, edges) as IEdge [];
};

export const createChange = <Type extends NodeChangeTypes | EdgeChangeTypes>(changeData: Type['changeData'][], changeType: Type['type']): Type[] => {
  return changeData.map(c => ({...c, type: changeType} as unknown as Type));
};