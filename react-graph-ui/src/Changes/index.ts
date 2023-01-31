/* eslint-disable @typescript-eslint/no-explicit-any */
import { INode } from "../Types";
import { ChangeTypes } from "../Types/changes";

const applyChanges = (changes: any[], elements: any[]): any[] => {
  const initElements: any[] = changes.filter((c) => c.type === 'add').map((c) => c.item);

  return elements.reduce((res: any[], item: any) => {
    const currentChanges = changes.filter((c) => c.id === item.id);

    if (currentChanges.length === 0) {
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
          case 'select': {
            updateItem.selected = currentChange.selected;
            break;
          }
        }
      }
    }

    res.push(updateItem);
    return res;
  }, elements);
}

export const applyNodeChanges = <NodeData>(changes: ChangeTypes[], nodes: INode<NodeData>[]): INode<NodeData>[] => {
  return applyChanges(changes, nodes) as INode<NodeData>[];
}

export const createChange = <Type extends ChangeTypes>(changeData: Type['changeData'][], changeType: Type['type']): Type[] => {
  return changeData.map(c => ({...c, type: changeType} as unknown as Type));
}