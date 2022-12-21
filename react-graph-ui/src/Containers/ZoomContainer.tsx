import { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3-zoom";
import {select} from 'd3-selection'
import NodeRenderer from "../Renderers/NodeRenderer";
import React from "react";
import useTransformStore from "../Stores/TransformStore";
import { useZoomContextStore } from "../Stores/ZoomContextStore";

interface FlowZoomProps {
  children?: React.ReactNode
}

export const ZoomContainer = ({children}: FlowZoomProps) => {
  const flowZoom = useRef<HTMLDivElement>(null);
  const zoomContext = useRef<HTMLDivElement>(null);
  const scale = useTransformStore((state) => state.scale);
  const translateX = useTransformStore((state) => state.translateX);
  const translateY = useTransformStore((state) => state.translateY);
  const setScale = useTransformStore((state) => state.setScale);
  const setTranslateX = useTransformStore((state) => state.setTranslateX);
  const setTranslateY = useTransformStore((state) => state.setTranslateY);
  const setZoomContextDimensions = useZoomContextStore((state) => state.setContextDimensions);
  const setZoomContextPosition = useZoomContextStore((state) => state.setContextPosition);

  const updateZoomContext = useCallback(() => {
    const context = zoomContext.current
    if(context !== null && flowZoom.current !== null){
      const contextRect = context.getBoundingClientRect();
      const zoomRect = flowZoom.current.getBoundingClientRect();
      setZoomContextDimensions({width: contextRect.width, height: contextRect.height})
      setZoomContextPosition({offsetX: (contextRect.left - zoomRect.left) / scale, offsetY: (contextRect.top - zoomRect.top) / scale})
    }
  }, [scale, setZoomContextDimensions, setZoomContextPosition]);

  useEffect(() => {
    if(flowZoom.current){
      const zoom = d3.zoom().on("zoom", (event) => {
        const { x, y, k } = event.transform;
        setScale(k);
        setTranslateX(x);
        setTranslateY(y);

        event.sourceEvent.preventDefault()
        event.sourceEvent.stopPropagation();
      }).scaleExtent([0.1, 2]).filter(event => zoomFilter(event));
      select(flowZoom.current as Element).call(zoom);
      updateZoomContext()
    }
    
  }, [scale, setScale, setTranslateX, setTranslateY, translateX, translateY, updateZoomContext])

  const zoomFilter = (e) => {
    const className = e.target.classList.contains('flow-ui-noZoom')
    return !className
  }

  return (
    <div ref={flowZoom} style={{ width: '100%', height: '100%', zIndex: -1, backgroundColor: 'transparent'}}>
      <div ref={zoomContext} style={{ height: "100%", left: 0, top: 0, width: "100%", transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`, transformOrigin: '0 0'}}>
        {children}
      </div>
    </div>
  );
}

export default ZoomContainer