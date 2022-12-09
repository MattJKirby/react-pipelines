import React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';

interface FlowCanvasProps {
  gap: number
  size: number
  color?: string
  backgroundColor?: string,
  transform: any
}

const createGridDotsPath = (size: number, fill: string): React.ReactElement => {
  return <circle cx={size} cy={size} r={size} fill={fill} />;
};

export const FlowCanvas = ({transform, gap, size, color, backgroundColor}: FlowCanvasProps) => {

  const [scaledGap, setScaledGap] = useState(gap * transform.k)
  const [xOffset, setXOffset] = useState(transform.x % scaledGap)
  const [yOffset, setYOffset] = useState(transform.y % scaledGap)

  useEffect(() => {
    setScaledGap(gap * transform.k)
    setXOffset(transform.x % scaledGap)
    setYOffset(transform.y % scaledGap)
  }, [gap, transform, scaledGap])


  return (
      <svg width={'100%'} height={'100%'} style={{backgroundColor: backgroundColor? backgroundColor : '#f9fafc', pointerEvents: 'none', position: 'absolute', top: 0, zIndex: -1}}>
        <pattern
        id='pattern'
        x={xOffset}
        y={yOffset}
        width={scaledGap}
        height={scaledGap}
        patternUnits="userSpaceOnUse"
        >
          {createGridDotsPath(size * transform.k, color? color :'#8f95b2')}
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${'pattern'})`} />

      </svg>
  )
}


export default FlowCanvas