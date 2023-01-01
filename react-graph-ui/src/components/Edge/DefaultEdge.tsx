import React from "react"
import { useEdgeContext } from "../../Contexts/EdgeDataContext";
import { IHandle } from "../../Types";
import { CalculateStraightPath } from "./utils";

const DefaultEdge = () => {
  const edge = useEdgeContext() as {source: IHandle, target: IHandle}

  return (
    <>
    {edge && 
      <path d={CalculateStraightPath(edge.source, edge.target)} style={{stroke: '#bbb'}}/>
      }
    </>
  )
}

DefaultEdge.displayName = 'TestNode';

export default DefaultEdge