import { Children, useEffect, useRef, useState } from "react";
import * as d3 from "d3-zoom";
import {create,select} from 'd3-selection'
import FlowCanvas from "./canvas";
import NodeRenderer from "./nodeRenderer";
import React from "react";

interface FlowZoomProps {
  children?: React.ReactNode
  nodeList: any
  edgeList: any
  setTransform: (transform: any) => void
}


export const FlowZoom = ({children, nodeList, edgeList, setTransform}: FlowZoomProps) => {
  const flowZoom = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [transform, setTransformx] = useState({k: k, x: x, y: y})

  useEffect(() => {
    if(flowZoom.current){
      const zoom = d3.zoom().scaleExtent([0.1, 2]).on("zoom", (event) => {
        const { x, y, k } = event.transform;
        setTransform(event.transform)
        setK(k);
        setX(x);
        setY(y); 

       event.sourceEvent.preventDefault()
       event.sourceEvent.stopPropagation();
      
      }).filter(event => zoomFilter(event));
     const selection = select(flowZoom.current as Element).call(zoom);
      const updatedTransform = d3.zoomIdentity.translate(x, y).scale(k);
      setTransformx(updatedTransform)
    }
    
  }, [k, setTransform, x, y])

  const zoomFilter = (e) => {
    const className = e.target.classList.contains('flow-ui-noZoom')
    return !className
  }

  return (
    <div className='' ref={flowZoom} style={{ width: '100%', height: '100%', zIndex: -1, backgroundColor: 'transparent'}}>
      <div style={{ position: 'absolute', height: "100%", left: 0, top: 0, width: "100%", transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`, transformOrigin: '0 0'}}>
        <NodeRenderer nodeList={nodeList} transform={{ k: k, x: x, y: y}}/>
        {children}
      </div>
      
    </div>
  );
}

export default FlowZoom