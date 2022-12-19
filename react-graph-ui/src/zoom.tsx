import { Children, useEffect, useRef, useState } from "react";
import * as d3 from "d3-zoom";
import {create,select} from 'd3-selection'
import FlowCanvas from "./canvas";
import NodeRenderer from "./nodeRenderer";
import React from "react";
import useTransformStore from "./stores/transformStore";

interface FlowZoomProps {
  children?: React.ReactNode
  nodeList: any
  edgeList: any
  setTransform: (transform: any) => void
}


export const FlowZoom = ({children, nodeList, edgeList, setTransform}: FlowZoomProps) => {
  const flowZoom = useRef<HTMLDivElement>(null);
  const scale = useTransformStore((state) => state.scale);
  const translateX = useTransformStore((state) => state.translateX);
  const translateY = useTransformStore((state) => state.translateY);
  const setScale = useTransformStore((state) => state.setScale);
  const setTranslateX = useTransformStore((state) => state.setTranslateX);
  const setTranslateY = useTransformStore((state) => state.setTranslateY);

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
    }
    
  }, [scale, setScale, setTranslateX, setTranslateY, translateX, translateY])

  const zoomFilter = (e) => {
    const className = e.target.classList.contains('flow-ui-noZoom')
    return !className
  }

  return (
    <div className='' ref={flowZoom} style={{ width: '100%', height: '100%', zIndex: -1, backgroundColor: 'transparent'}}>
      <div style={{ height: "100%", left: 0, top: 0, width: "100%", transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`, transformOrigin: '0 0'}}>
        <NodeRenderer nodeList={nodeList}/>
        {children}
      </div>
      
    </div>
  );
}

export default FlowZoom