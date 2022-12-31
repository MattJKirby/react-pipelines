import React, { memo } from 'react';
import { useEffect, useState } from 'react';
import { useStore } from '../../Hooks/useStore';
import { IGraphState } from '../../Types';
import { createGridDotsPath } from './utils';

interface GraphCanvasProps {
  gap: number;
  size: number;
  color?: string;
  backgroundColor?: string;
}

const selector = (s: IGraphState) => ({
  graphId: s.graphId,
  transform: s.graphTransform,
});

const GraphCanvas = ({ gap, size, color, backgroundColor }: GraphCanvasProps) => {
  const {transform, graphId} = useStore(selector)
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
        id={`pattern-${graphId}`}
        x={xOffset}
        y={yOffset}
        width={scaledGap}
        height={scaledGap}
        patternUnits="userSpaceOnUse"
      >
        {createGridDotsPath(size * transform.scale, color ? color : '#8f95b2')}
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-${graphId})`} />

    </svg>
  )
}

GraphCanvas.DisplayName = "GraphCanvas"


export default memo(GraphCanvas)