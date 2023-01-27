import React from "react"
import { EdgeTypeProps } from "../../Renderers/EdgeRenderer";
import { CalculateStraightPath } from "./utils";

const DefaultEdge = ({
  sourceHandle, 
  targetHandle
}: EdgeTypeProps) => {

  return (
    <>
      <path d={CalculateStraightPath(sourceHandle, targetHandle)} style={{stroke: '#bbb'}}/>
    </>
  )
}

DefaultEdge.displayName = 'TestNode';

export default DefaultEdge