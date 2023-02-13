import React, { memo } from "react"
import { EdgeTypeProps } from "../../Renderers/EdgeRenderer";

const DefaultEdge = ({
  selected,
  path
}: EdgeTypeProps) => {

  return (
    <>
      <path d={path} style={{stroke: selected ? '#000' : '#bbb'}}/>
    </>
  )
}

DefaultEdge.displayName = 'TestNode';

export default memo(DefaultEdge)