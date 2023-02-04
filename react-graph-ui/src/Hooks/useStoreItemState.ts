/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, Dispatch, useCallback } from 'react';
import { useState } from "react"
import { applyEdgeChanges, applyNodeChanges } from '../Changes';
import { IEdge, INode } from "../Types"
import { EdgeChangeTypes, NodeChangeTypes } from '../Types/changes';

type ApplyChanges<ChangeType, ItemType> = (changed: ChangeType[], items: ItemType[]) => ItemType[];
type OnChange<ChangeType> = (changes: ChangeType[]) => void;

function createUseStoreItemsState(applyChanges: ApplyChanges<NodeChangeTypes, INode>): <NodeData = any>(initialItems: INode<NodeData>[]) => [INode<NodeData>[], Dispatch<SetStateAction<INode<NodeData>[]>>, OnChange<NodeChangeTypes>]
function createUseStoreItemsState(applyChanges: ApplyChanges<EdgeChangeTypes, IEdge>): (initialItems: IEdge[]) => [IEdge[], Dispatch<SetStateAction<IEdge[]>>, OnChange<EdgeChangeTypes>]

function createUseStoreItemsState(applyChanges: ApplyChanges<any, any>): (initialItems: any[]) => [any[], Dispatch<SetStateAction<any[]>>, OnChange<any>] {
  return (initialItems: any[]) => {
    const [items, setItems] = useState(initialItems);

    const onItemsChange = useCallback((changes: any[]) => {
      setItems((items: any) => applyChanges(changes, items))
    }, [])

    return [items, setItems, onItemsChange];
  };
};


export const useNodesStore = createUseStoreItemsState(applyNodeChanges);
export const useEdgeStore = createUseStoreItemsState(applyEdgeChanges);
