export interface IGraphCanvasProps {
  gap: number;
  size: number;
  color?: string;
  backgroundColor?: string;
  style?: CanvasStyle;
}

export type CanvasStyle = 'grid' | 'dots';