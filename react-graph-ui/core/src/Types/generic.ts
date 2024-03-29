import { IEdge } from "./edge";

export type Position = "top" | "bottom" | "left" | "right";

export interface IXYPosition {
  x: number,
  y: number,
}

export type Dimension = {
  width: number,
  height: number
}

export type Box = {
  x: number,
  y: number,
  x2: number,
  y2: number
}

export type Rect = {
  x: number,
  y: number,
  width: number,
  height: number
}

export interface ITransform {
  scale: number,
  translateX: number,
  translateY: number,
}

export type ValueExtent<LimitsRequired extends boolean> = LimitsRequired extends true ? [min: number, max: number] : [min: number | null, max: number | null]

export type BoundedValueExtent = ValueExtent<true>;

export type UnboundedValueExtent = ValueExtent<false>;

export type CoordinateExtent = [x: BoundedValueExtent, y: BoundedValueExtent];

export type Connection = {
  source: string | null,
  target: string | null,
  sourceHandle: string | null,
  targetHandle: string | null
}

export type IsValidConnection = (edge: IEdge | Connection) => boolean;