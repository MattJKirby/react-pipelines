/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEdge } from "./edge";
import { Dimension, IXYPosition } from "./generic"
import { IHandle } from "./handle";
import { INode } from "./node";

export type NodeChange<Type, ChangeData> = {
  type: Type;
  changeData: ChangeData;
}

export type NodeChangeTypes =
  | NodePositionChange 
  | NodeDOMChange
  | NodeSelectionChange
  | NodeAddChange
  | RemoveNodeChange;

export type NodePositionChange = NodeChange<'position', NodePositionChangeData>;
export type NodeDOMChange = NodeChange<'dom', NodeDOMChangeData>;
export type NodeSelectionChange = NodeChange<'select', NodeSelectionChangeData>;
export type NodeAddChange = NodeChange<'add', NodeAddChangeData>;
export type RemoveNodeChange = NodeChange<'remove', RemoveNodeChangeData>;

export type NodePositionChangeData = {
  id: string;
  position: IXYPosition;
  dragging: boolean;
}

export type NodeDOMChangeData = {
  id: string,
  dimensions?: Dimension,
  sourceHandles: Map<string, IHandle> | null,
  targetHandles: Map<string, IHandle> | null,
}

export type NodeSelectionChangeData = {
  id: string;
  selected: boolean;
}

export type NodeAddChangeData<NodeData = any> = {
  item: INode<NodeData>;
}

export type RemoveNodeChangeData = {
  id: string;
}

export type EdgeChangeTypes = 
  | EdgeAddChange
  | EdgeSelectionChange
  | RemoveEdgeChange;

export type EdgeAddChange = NodeChange<'add', EdgeAddChangeData>
export type EdgeSelectionChange = NodeChange<'select', EdgeSelectionChangeData>
export type RemoveEdgeChange = NodeChange<'remove', RemoveEdgeChangeData>

export type EdgeAddChangeData = {
  item: IEdge;
}

export type EdgeSelectionChangeData = {
  id: string;
  selected: boolean;
}

export type RemoveEdgeChangeData = {
  id: string;
}