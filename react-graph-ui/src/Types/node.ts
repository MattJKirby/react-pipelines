/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject } from "react";
import { StoreApi } from "zustand";
import { internalsSymbol } from "../Utils";
import { Dimension, IXYPosition } from "./generic";
import { IGraphState } from "./graph";
import { IHandle } from "./handle";

export interface INode<T = any> {
  id: string;
  type: string;
  position: IXYPosition;
  dimensions?: Dimension;
  selected?: boolean;
  enableSelect?: boolean;
  dragging?: boolean;
  enableDrag?: boolean;
  data: T;
  z?: number;

  // Only used internally
  [internalsSymbol]?: {
    handles: INodeHandles;
  };
}

export interface INodeProps<T = any> {
  id: string;
  position: IXYPosition;
  dimensions: Dimension;
  selected: boolean;
  dragging: boolean;
  data: T;
}

// TODO: rename this to IStoreAPI
export interface INodeStore {
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

export interface NodeContainerProps {
  children: React.ReactNode;
  id: string;
  type: string;
  position: IXYPosition;
  selected: boolean;
  enableSelect: boolean;
  enableDrag: boolean;
  selectOnDrag: boolean;
  z: number | 'initial';
}

export interface INodeHandles {
  source: Map<string, IHandle>;
  target: Map<string, IHandle>;
}