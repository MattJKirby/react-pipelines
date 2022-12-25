import React from 'react';
import { useEffect, useState } from 'react';
import useTransformStore, { ITransform } from '../../Stores/TransformStore';
import { createGridDotsPath } from './utils';

interface GraphCanvasProps {
  gap: number;
  size: number;
  color?: string;
  backgroundColor?: string;
}

export const GraphCanvas = ({ gap, size, color, backgroundColor }: GraphCanvasProps) => {
  const transform = useTransformStore<ITransform>((state) => state.transform)
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


export default GraphCanvas