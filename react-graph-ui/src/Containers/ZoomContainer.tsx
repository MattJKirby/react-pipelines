/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from "react";
import * as d3 from "d3-zoom";
import {select} from 'd3-selection'
import React from "react";

import { useZoomContextStore } from "../Stores/zoomContextStore";
import { useStore } from "../Hooks/useStore";


interface FlowZoomProps {
  children?: React.ReactNode
}

export const ZoomContainer = ({children}: FlowZoomProps) => {
  const flowZoom = useRef<HTMLDivElement>(null);
  const zoomContext = useRef<HTMLDivElement>(null);
  const transform= useStore(s => s.graphTransform)
  const setTransform = useStore(s => s.setGraphTransform)
  const setZoomContextDimensions = useZoomContextStore((state) => state.setContextDimensions);
  const setZoomContextPosition = useZoomContextStore((state) => state.setContextPosition);
  const zoomFilter = (e: any) => e.target.closest('.flow-ui-noZoom') === null;

  const updateZoomContext = useCallback(() => {
    const context = zoomContext.current
    if(context !== null && flowZoom.current !== null){
      const contextRect = context.getBoundingClientRect();
      const zoomRect = flowZoom.current.getBoundingClientRect();
      setZoomContextDimensions({width: contextRect.width, height: contextRect.height})
      setZoomContextPosition({offsetX: (contextRect.left - zoomRect.left) / transform.scale, offsetY: (contextRect.top - zoomRect.top) / transform.scale})
    }
  }, [transform.scale, setZoomContextDimensions, setZoomContextPosition]);

  useEffect(() => {
    if(flowZoom.current){
      const zoom = d3.zoom().on("zoom", (event) => {
        const { x, y, k } = event.transform;
        setTransform({scale: k, translateX: x, translateY: y})

        event.sourceEvent.preventDefault()
        event.sourceEvent.stopPropagation();
      }).scaleExtent([0.1, 2]).filter(event => zoomFilter(event));
      select(flowZoom.current as Element).call(zoom);
      updateZoomContext()
    }
    
  }, [updateZoomContext, setTransform])

  return (
    <div ref={flowZoom} style={{ width: '100%', height: '100%', zIndex: -1, backgroundColor: 'transparent'}}>
      <div ref={zoomContext} style={{ height: "100%", left: 0, top: 0, width: "100%", transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`, transformOrigin: '0 0'}}>
        {children}
      </div>
    </div>
  );
}

export default ZoomContainer