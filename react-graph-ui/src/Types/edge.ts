export interface IEdge {
  id: string;
  sourceNodeId: number;
  sourceNodeOutput: string;
  targetNodeId: number;
  targetNodeInput: string;
  type: string;
}