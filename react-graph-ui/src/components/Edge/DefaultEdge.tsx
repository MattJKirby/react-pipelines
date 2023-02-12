import React from "react"
import { EdgeTypeProps } from "../../Renderers/EdgeRenderer";

const DefaultEdge = ({
  selected,
  path
}: EdgeTypeProps) => {

  return (
    <>
      <path d={path} style={{stroke: selected ? 'red' : '#bbb'}}/>
    </>
  )
}

DefaultEdge.displayName = 'TestNode';

export default DefaultEdge