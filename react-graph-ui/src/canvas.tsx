import React from 'react';
import { useEffect, useState } from 'react';
import useTransformStore from './Stores/TransformStore';

interface FlowCanvasProps {
  gap: number;
  size: number;
  color?: string;
  backgroundColor?: string;
}

const createGridDotsPath = (size: number, fill: string): React.ReactElement => {
  return <circle cx={size} cy={size} r={size} fill={fill} />;
};

export const FlowCanvas = ({ gap, size, color, backgroundColor }: FlowCanvasProps) => {
  const transform = useTransformStore((state) => state.transform)
  const [scaledGap, setScaledGap] = useState(gap * transform.scale)
  const [xOffset, setXOffset] = useState(transform.translateX % scaledGap)
  const [yOffset, setYOffset] = useState(transform.translateY % scaledGap)

  useEffect(() => {
    setScaledGap(gap * transform.scale)
    setXOffset(transform.translateX % scaledGap)
    setYOffset(transform.translateY % scaledGap)
  }, [gap, scaledGap, transform])


  return (
    <svg width={'100%'} height={'100%'} style={{ backgroundColor: backgroundColor ? backgroundColor : '#f9fafc', pointerEvents: 'none', position: 'absolute', top: 0, zIndex: -1 }}>
      <pattern
        id='pattern'
        x={xOffset}
        y={yOffset}
        width={scaledGap}
        height={scaledGap}
        patternUnits="userSpaceOnUse"
      >
        {createGridDotsPath(size * transform.scale, color ? color : '#8f95b2')}
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${'pattern'})`} />

    </svg>
  )
}


export default FlowCanvas