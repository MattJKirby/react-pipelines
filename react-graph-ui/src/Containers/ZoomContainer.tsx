/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import React from "react";
import { useStoreApi } from "../Hooks/useStoreApi";
import useGraphTransform from "../Hooks/useGraphTransform";

interface FlowZoomProps {
  children?: React.ReactNode
}

export const ZoomContainer = ({children}: FlowZoomProps) => {
  const zoomContainer = useRef<HTMLDivElement>(null);
  const store = useStoreApi();
  const transform = useGraphTransform({store, transformerRef: zoomContainer})

  return (
    <div className="RP_ZoomViewport__Container" ref={zoomContainer} style={{ width: '100%', height: '100%', zIndex: -1, backgroundColor: 'transparent'}}>
      <div className="RP_ZoomViewport" style={{ height: "100%", left: 0, top: 0, width: "100%", transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`, transformOrigin: '0 0', position: 'relative'}}>
        {children}
      </div>
    </div>
  );
}

export default ZoomContainer
