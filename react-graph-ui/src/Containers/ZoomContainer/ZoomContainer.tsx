/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import React from "react";
import { useStoreApi } from "../../Hooks/useStoreApi";
import * as d3 from "d3-zoom";
import {select} from 'd3-selection'
import { useStore } from "../../Hooks/useStore";
import { IGraphState } from "../../Types";

interface FlowZoomProps {
  children?: React.ReactNode
}

const selector = (s: IGraphState) => ({
  transform: s.graphTransform,
  d3Zoom: s.d3Zoom,
  d3Selection: s.d3Selection,
  setGraphTransform: s.setGraphTransform,
});

export const ZoomContainer = ({children}: FlowZoomProps) => {
  const zoomContainer = useRef<HTMLDivElement>(null);
  const storeApi = useStoreApi();
  const {transform, d3Zoom, d3Selection, setGraphTransform} = useStore(selector)

  /**
   * Register the d3ZoomInstance and d3Selection in the store.
   */
  useEffect(() => {
    if(zoomContainer.current){
      const zoomFilter = (e: any) => e.target.closest('.flow-ui-noZoom') === null;
      const d3ZoomInstance = d3.zoom().scaleExtent([0.1,2]).filter(event => zoomFilter(event));
      const d3Selection = select(zoomContainer.current as Element).call(d3ZoomInstance);

      storeApi.setState({
        d3Zoom: d3ZoomInstance,
        d3Selection: d3Selection
      })
    }
  }, [storeApi]);

  useEffect(() => {
    if(zoomContainer.current){
      if(d3Zoom && d3Selection){
        d3Zoom.on("zoom", (event) => {
          const { x, y, k } = event.transform;
          setGraphTransform({scale: k, translateX: x, translateY: y})
      
          // event.sourceEvent.preventDefault()
          // event.sourceEvent.stopPropagation();
        })
      }
    }
  }, [d3Selection, d3Zoom, setGraphTransform])

  return (
    <div className="RP_ZoomViewport__Container" ref={zoomContainer} style={{ width: '100%', height: '100%', zIndex: -1, backgroundColor: 'transparent'}}>
      <div className="RP_ZoomViewport" style={{ height: "100%", left: 0, top: 0, width: "100%", transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`, transformOrigin: '0 0', position: 'relative'}}>
        {children}
      </div>
    </div>
  );
}

export default ZoomContainer
