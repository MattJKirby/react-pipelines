import React, { memo } from 'react';
import { useEffect, useState } from 'react';
import { useStore } from '../../Hooks/useStore';
import { IGraphState } from '../../Types';
import { IGraphCanvasProps } from '../../Types/canvas';
import { createGridDotsPath, createGridLinesPath } from './utils';




const selector = (s: IGraphState) => ({
  graphId: s.graphId,
  transform: s.graphTransform,
});

const GraphCanvas = ({ 
  gap, 
  size, 
  color, 
  backgroundColor, 
  style = 'dots'
}: IGraphCanvasProps) => {
  
  
  
  const {transform, graphId} = useStore(selector)
  const [scaledGap, setScaledGap] = useState(gap * transform.scale)
  const [xOffset, setXOffset] = useState(transform.translateX % scaledGap)
  const [yOffset, setYOffset] = useState(transform.translateY % scaledGap)

  useEffect(() => {
    setScaledGap(gap * transform.scale)
    setXOffset(transform.translateX % scaledGap)
    setYOffset(transform.translateY % scaledGap)
  }, [gap, scaledGap, transform])


  const patternGenerator = () => {
    if(style === 'dots'){
      return createGridDotsPath(size * transform.scale, color ? color : '#ccc');
    } else {
      return createGridLinesPath(scaledGap, color ? color : '#ccc', transform.scale)
    }
  }

  return (
    <svg width={'100%'} height={'100%'} style={{ backgroundColor: backgroundColor ? backgroundColor : '#FFF', pointerEvents: 'none', position: 'absolute', top: 0, zIndex: -1 }}>
      <pattern
        id={`pattern-${graphId}`}
        x={xOffset}
        y={yOffset}
        width={scaledGap}
        height={scaledGap}
        patternUnits="userSpaceOnUse"
      >
        {patternGenerator()}
      </pattern>
      
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${graphId})`} />
    </svg>
  )
}

GraphCanvas.DisplayName = "GraphCanvas"


export default memo(GraphCanvas)