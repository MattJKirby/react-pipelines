export interface IEdge {
  id: string;
  sourceNodeId: string;
  sourceNodeOutput: string;
  targetNodeId: string;
  targetNodeInput: string;
  type: string;
}