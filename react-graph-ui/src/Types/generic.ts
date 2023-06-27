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