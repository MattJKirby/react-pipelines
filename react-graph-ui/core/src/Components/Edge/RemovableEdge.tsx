import { memo } from "react"
import { EdgeProps } from "../../Types";
import { CalculateBezierPath } from "./pathTypes";
import BaseEdge from "./BaseEdge";
import EdgeContentRenderer from "../EdgeContentRenderer";
import useReactPipelines from "../../Hooks/useReactPipelines";

const RemovableEdge = (props: EdgeProps) => {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props
  const [path, center] = CalculateBezierPath({x: sourceX, y: sourceY}, {x: targetX, y: targetY}, sourcePosition, targetPosition)
  const { deleteElements } = useReactPipelines()

  const onEdgeButtonClick = (e: any, edgeId: string) => {
    deleteElements({removedEdgeIds: [edgeId]})
  }

  return (
    <>
      <BaseEdge path={path} {...props}/>
      <EdgeContentRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${center.centerX}px,${center.centerY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
          }}
          className="flow-ui-noZoom"
        >
          <button className="edgebutton" onClickCapture={(event) => onEdgeButtonClick(event, props.id)}>
            ×
          </button>

        </div>
      </EdgeContentRenderer>
    </>
  
  
  
  )
}

RemovableEdge.displayName = 'BezierEdge';

export default memo(RemovableEdge)