/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject } from "react";
import { StoreApi } from "zustand";
import { IXYPosition } from "./generic";
import { IGraphState } from "./graph";

export interface INode<T = any> {
  id: string;
  type: string;
  width?: number | null;
  height?: number | null;
  position: IXYPosition;
  selected: boolean;
  enableSelect: boolean;
  dragging: boolean;
  enableDrag: boolean;
  data: T;
}

export interface INodeProps<T = any> {
  id: string;
  position: IXYPosition;
  selected: boolean;
  dragging: boolean;
  data: T;
}

interface INodeStore {
  getState: StoreApi<IGraphState>['getState'],
  setState: StoreApi<IGraphState>['setState'],
}

export interface INodeSelectHandlerProps {
  id: string;
  unselect?: boolean;
  store: INodeStore;
  disabled?: boolean;
}

export interface IUseDragProps {
  store: INodeStore
  nodeRef: RefObject<Element>;
  disabled?: boolean;
  nodeId: string;
  position: IXYPosition;
  selectOnDrag?: boolean;
}

export type NodeInternals = Map<string, INode>;