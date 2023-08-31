import { memo } from "react"
import { EdgeProps } from "../../Renderers/EdgeRenderer";
import { CalculateBezierPath } from "./pathTypes";
import BaseEdge from "./BaseEdge";

const BezierEdge = (props: EdgeProps) => {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props
  const path = CalculateBezierPath({x: sourceX, y: sourceY}, {x: targetX, y: targetY}, sourcePosition, targetPosition)

  return (<BaseEdge path={path} {...props}/>)
}

BezierEdge.displayName = 'BezierEdge';

export default memo(BezierEdge)