/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, Dispatch, useCallback } from 'react';
import { useState } from "react"
import { applyEdgeChanges, applyNodeChanges } from '../Changes';
import { IEdge, INode } from "../Types"
import { EdgeChangeTypes, NodeChangeTypes } from '../Types/changes';

type ApplyChanges<ChangeType, ItemType> = (changed: ChangeType[], items: ItemType[]) => ItemType[];
type OnChange<ChangeType> = (changes: ChangeType[]) => void;

function createUseStoreItemsState<ChangeType extends NodeChangeTypes>(applyChanges: ApplyChanges<NodeChangeTypes, INode>): <NodeData = any>(initialItems: INode<NodeData>[]) => [INode<NodeData>[], Dispatch<SetStateAction<INode<NodeData>[]>>, OnChange<NodeChangeTypes>, ChangeType[]]
function createUseStoreItemsState<ChangeType extends EdgeChangeTypes>(applyChanges: ApplyChanges<EdgeChangeTypes, IEdge>): (initialItems: IEdge[]) => [IEdge[], Dispatch<SetStateAction<IEdge[]>>, OnChange<EdgeChangeTypes>, ChangeType[]]

function createUseStoreItemsState<ChangeType>(applyChanges: ApplyChanges<any, any>): (initialItems: any[]) => [any[], Dispatch<SetStateAction<any[]>>, OnChange<any>, ChangeType[]] {
  return (initialItems: any[]) => {
    const [items, setItems] = useState(initialItems);
    const [changes, setChanges] = useState<ChangeType[]>([]);

    const onItemsChange = useCallback((changes: ChangeType[]) => {
      setItems((items: any) => applyChanges(changes, items))
      setChanges(changes)
    }, [])

    return [items, setItems, onItemsChange, changes];
  };
};


export const useNodesStore = createUseStoreItemsState<NodeChangeTypes>(applyNodeChanges);
export const useEdgeStore = createUseStoreItemsState<EdgeChangeTypes>(applyEdgeChanges);
