import React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import useTransformStore from './store/transformStore';

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

export const FlowCanvas = ({gap, size, color, backgroundColor}: FlowCanvasProps) => {
  const scale = useTransformStore((state) => state.scale);
  const translateX = useTransformStore((state) => state.translateX);
  const translateY = useTransformStore((state) => state.translateY);
  const [scaledGap, setScaledGap] = useState(gap * scale)
  const [xOffset, setXOffset] = useState(translateX % scaledGap)
  const [yOffset, setYOffset] = useState(translateY % scaledGap)

  useEffect(() => {
    setScaledGap(gap * scale)
    setXOffset(translateX % scaledGap)
    setYOffset(translateY % scaledGap)
  }, [gap, scale, scaledGap, translateX, translateY])


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
          {createGridDotsPath(size * scale, color? color :'#8f95b2')}
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#${'pattern'})`} />

      </svg>
  )
}


export default FlowCanvas