import React from "react"
import { EdgeTypeProps } from "../../Renderers/EdgeRenderer";
import { CalculateStraightPath } from "./utils";

const DefaultEdge = ({
  sourceHandle, 
  targetHandle,
  selected
}: EdgeTypeProps) => {

  return (
    <>
      <path d={CalculateStraightPath(sourceHandle, targetHandle)} style={{stroke: selected ? 'red' : '#bbb'}}/>
    </>
  )
}

DefaultEdge.displayName = 'TestNode';

export default DefaultEdge