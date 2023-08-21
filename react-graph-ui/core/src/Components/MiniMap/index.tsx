import React, { FC, memo } from "react"
import Panel from "../Panel";
import { useStore } from "../../Hooks/useStore";
import { IGraphState } from "../../Types";
import MapNode from "./mapNode";
import { CalculateGraphViewportRect, computeNodeBoundingBox } from "../Graph/utils";
import { boxToRect, computeBoxBounds, rectToBox } from "../../Utils";

type MiniMapProps = {
  top?: boolean;
  right?: boolean;
  width?: number;
  height?: number;
}

const selector = (s: IGraphState) => {
  const nodes = s.getNodes()
  const transform = s.graphTransform;
  const dimensions = s.graphDimensions;
  const viewRect = CalculateGraphViewportRect(transform, dimensions);

  return {
    transform,
    dimensions,
    viewRect: viewRect,
    nodes: nodes.filter(n => n.dimensions !== undefined),
    contentRect: nodes.length > 0 ? boxToRect(computeBoxBounds(computeNodeBoundingBox(nodes), rectToBox(viewRect))) : viewRect
  }
};

const MiniMap: FC<MiniMapProps> = ({
  top = false,
  right = false,
  width = 200,
  height = 150,
}) => {
  const {nodes, viewRect, contentRect} = useStore(selector);
  
  const scaledWidth = contentRect.width / width;
  const scaledHeight = contentRect.height / height;
  const viewScale = Math.max(scaledWidth, scaledHeight);
  const mappedWidth = viewScale * width;
  const mappedHeight = viewScale * height;
  const offset = 2 * viewScale;
  const x = contentRect.x - (mappedWidth - contentRect.width) / 2 - offset;
  const y = contentRect.y - (mappedHeight - contentRect.height) / 2 - offset;
  const viewBoxWidth = (mappedWidth + offset * 2);
  const viewBoxHeight = (mappedHeight + offset * 2);
  
  return (
    <Panel
      style={{right: right ? 0 : "auto", bottom: !top ? 0 : "auto",zIndex: 5}}>
        <svg
          style={{width: `${width}px`, height: `${height}px`, backgroundColor: "white"}} 
          viewBox={`${x} ${y} ${viewBoxWidth} ${viewBoxHeight}`}
        >

        {nodes.map((node) => {
          return (<MapNode 
            key={node.id}
            nodeId={node.id} 
            position={node.position}
            dimensions={node.dimensions || {width: 0, height: 0}}
          />)
        })}

        <path
          className="RP_MiniMap__Mask"
          d={`M${x - offset},${y - offset}h${viewBoxWidth + offset * 2}v${viewBoxHeight + offset * 2}h${-viewBoxWidth - offset * 2}z
            M${viewRect.x},${viewRect.y}h${viewRect.width}v${viewRect.height}h${-viewRect.width}z`}
          fill={"rgba(240, 240, 240, 0.6)"}
          fillRule="evenodd"
          stroke="red"
          strokeWidth={0}
          pointerEvents="none"
        />

        </svg>
    </Panel>
  )
}

export default memo(MiniMap);