import { Children, useEffect, useRef, useState } from "react";
import * as d3 from "d3-zoom";
import {create,select} from 'd3-selection'
import FlowCanvas from "./canvas";
import NodeRenderer from "./nodeRenderer";
import React from "react";
import useTransformStore from "./store/transformStore";

interface FlowZoomProps {
  children?: React.ReactNode
  nodeList: any
  edgeList: any
  setTransform: (transform: any) => void
}


export const FlowZoom = ({children, nodeList, edgeList, setTransform}: FlowZoomProps) => {
  const flowZoom = useRef<HTMLDivElement>(null);
  // const [k, setK] = useState(1);
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);
  const scale = useTransformStore((state) => state.scale);
  const translateX = useTransformStore((state) => state.translateX);
  const translateY = useTransformStore((state) => state.translateY);
  const setScale = useTransformStore((state) => state.setScale);
  const setTranslateX = useTransformStore((state) => state.setTranslateX);
  const setTranslateY = useTransformStore((state) => state.setTranslateY);
  // const [transform, setTransformx] = useState({k: k, x: x, y: y})

  useEffect(() => {
    if(flowZoom.current){
      const zoom = d3.zoom().on("zoom", (event) => {
        const { x, y, k } = event.transform;
        // setTransform(event.transform)
        // setK(k);
        // setX(x);
        // setY(y); 
        setScale(k);
        setTranslateX(x);
        setTranslateY(y);

       event.sourceEvent.preventDefault()
       event.sourceEvent.stopPropagation();
      
      }).scaleExtent([0.1, 2]).filter(event => zoomFilter(event));
     const selection = select(flowZoom.current as Element).call(zoom);
      const updatedTransform = d3.zoomIdentity.translate(translateX, translateY).scale(scale);
      // setTransformx(updatedTransform)
      setScale(updatedTransform.k);
      setTranslateX(updatedTransform.x);
      setTranslateY(updatedTransform.y);
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