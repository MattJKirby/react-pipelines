/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SetStateAction, Dispatch } from 'react';
import { useState } from "react"
import { IEdge, INode } from "../Types"

type ApplyChanges<ItemType> = (items: ItemType[]) => ItemType[];


function createUseStoreItemsState(applyChanges: ApplyChanges<INode>): <NodeData = any>(initialItems: INode<NodeData>[]) => [INode<NodeData>[], Dispatch<SetStateAction<INode<NodeData>[]>>]
function createUseStoreItemsState(applyChanges: ApplyChanges<IEdge>): (initialItems: IEdge[]) => [IEdge[], Dispatch<SetStateAction<IEdge[]>>]

function createUseStoreItemsState(applyChanges: ApplyChanges<any>): (initialItems: any[]) => [any[], Dispatch<SetStateAction<any[]>>] {
  return (initialItems: any[]) => {
    const [items, setItems] = useState(initialItems);

    applyChanges(items)

    return [items, setItems];
  };
};

function applyNodeChanges<NodeData = any>(nodes: INode<NodeData>[]): INode<NodeData>[] {
  return nodes;
}
function applyEdgeChanges(edges: IEdge[]): IEdge[] {
  return edges;
}

export const useNodesStore = createUseStoreItemsState(applyNodeChanges);
export const useEdgeStore = createUseStoreItemsState(applyEdgeChanges);
