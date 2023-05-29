import React, { FC, memo } from "react"
import Panel from "../Panel";
import { useStore } from "../../Hooks/useStore";
import { IGraphState } from "../../Types";
import { boxToRect, computeBoxBounds, computeNodeBoundingBox, rectToBox } from "./utils";
import MapNode from "./mapNode";

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
  const viewRect = {
    x: -s.graphTransform.translateX / s.graphTransform.scale,
    y: -s.graphTransform.translateY / s.graphTransform.scale,
    width: s.graphDimensions.width / s.graphTransform.scale,
    height: s.graphDimensions.height / s.graphTransform.scale
  };

  return {
    transform,
    dimensions,
    viewRect,
    nodes: nodes.filter(n => n.dimensions !==undefined),
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

  const positionBottom = top ? `calc(100% - ${height}px)` : `0%`;
  const positionLeft = right ? `calc(100% - ${width}px)` : `0%`;
  
  return (
    <Panel 
      width={width} 
      height={height} 
      style={{bottom: positionBottom, left: positionLeft, zIndex: 9999}}>
        <svg
          style={{width: `${width}px`, height: `${height}px`, backgroundColor: "white"}} 
          viewBox={`${x} ${y} ${viewBoxWidth} ${viewBoxHeight}`}
        >

        <path
          className="RP_MiniMap__Mask"
          d={`M${x - offset},${y - offset}h${viewBoxWidth + offset * 2}v${viewBoxHeight + offset * 2}h${-viewBoxWidth - offset * 2}z
            M${viewRect.x},${viewRect.y}h${viewRect.width}v${viewRect.height}h${-viewRect.width}z`}
          fill={"#eee"}
          fillRule="evenodd"
          stroke="red"
          strokeWidth={0}
          pointerEvents="none"
        />

        {nodes.map((node) => {
          return (<MapNode 
            key={node.id}
            nodeId={node.id} 
            position={node.position}
            dimensions={node.dimensions || {width: 0, height: 0}}
          />)
        })}
  
        </svg>
    </Panel>
  )
}

export default memo(MiniMap);