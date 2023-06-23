import React, { FC, memo } from "react"
import Panel from "../Panel";
import { useStore } from "../../Hooks/useStore";
import { IGraphState } from "../../Types";
import { boxToRect, computeBoxBounds, computeNodeBoundingBox, rectToBox } from "./utils";
import MapNode from "./mapNode";
import { CalculateGraphTransformForViewport, CalculateGraphViewportRect } from "../Graph/utils";
import { CreateZoomIdentity } from "../../Containers/ZoomContainer/utils";

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
  const setTransform = s.setGraphTransform;

  return {
    transform,
    dimensions,
    viewRect: viewRect,
    nodes: nodes.filter(n => n.dimensions !== undefined),
    contentRect: nodes.length > 0 ? boxToRect(computeBoxBounds(computeNodeBoundingBox(nodes), rectToBox(viewRect))) : viewRect,
    setTransform,
    d3Zoom: s.d3Zoom,
    d3Selection: s.d3Selection
  }
};

const MiniMap: FC<MiniMapProps> = ({
  top = false,
  right = false,
  width = 200,
  height = 150,
}) => {
  const {nodes, viewRect, contentRect, dimensions, d3Zoom, d3Selection, setTransform} = useStore(selector);
  
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

  const test = () => {
    const transform = CalculateGraphTransformForViewport((boxToRect(computeNodeBoundingBox(nodes))), dimensions)
    // setTransform(transform)
 

    if(d3Zoom && d3Selection){
      d3Zoom.duration(700).transform(d3Selection, CreateZoomIdentity(transform))
    }
  }
  
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

        <button onClick={() => test()}>Test</button>
    </Panel>
  )
}

export default memo(MiniMap);