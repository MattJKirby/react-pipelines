import React, { memo } from "react"
import { EdgeTypeProps } from "../../Renderers/EdgeRenderer";

const DefaultEdge = ({
  selected,
  path
}: EdgeTypeProps) => {

  return (
    <>
      <path 
        d={path} 
        style={{stroke: selected ? '#000' : '#bbb'}}
        fill="none"
      />
    </>
  )
}

DefaultEdge.displayName = 'TestNode';

export default memo(DefaultEdge)