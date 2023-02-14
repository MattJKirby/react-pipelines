/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useRef } from "react";
import * as d3 from "d3-zoom";
import {select} from 'd3-selection'
import React from "react";
import { useStore } from "../Hooks/useStore";


interface FlowZoomProps {
  children?: React.ReactNode
}

export const ZoomContainer = ({children}: FlowZoomProps) => {
  const zoomContainer = useRef<HTMLDivElement>(null);
  const zoom = useRef<HTMLDivElement>(null);
  const transform= useStore(s => s.graphTransform)
  const setTransform = useStore(s => s.setGraphTransform)
  const zoomFilter = (e: any) => e.target.closest('.flow-ui-noZoom') === null;

  useEffect(() => {
    if(zoomContainer.current){
      const zoom = d3.zoom().on("zoom", (event) => {
        const { x, y, k } = event.transform;
        setTransform({scale: k, translateX: x, translateY: y})

        event.sourceEvent.preventDefault()
        event.sourceEvent.stopPropagation();
      }).scaleExtent([0.1, 2]).filter(event => zoomFilter(event));
      select(zoomContainer.current as Element).call(zoom);
    }
    
  }, [setTransform])

  return (
    <div ref={zoomContainer} style={{ width: '100%', height: '100%', zIndex: -1, backgroundColor: 'transparent'}}>
      <div ref={zoom} style={{ height: "100%", left: 0, top: 0, width: "100%", transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`, transformOrigin: '0 0', position: 'relative'}}>
        {children}
      </div>
    </div>
  );
}

export default ZoomContainer
