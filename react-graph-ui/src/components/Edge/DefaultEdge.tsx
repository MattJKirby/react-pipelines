import React from "react"
import { useEdgeContext } from "../../Contexts/EdgeDataContext";
import { IHandleData } from "../Handle/IHandleData";
import { CalculateStraightEdgePath } from "./utils";

const DefaultEdge = () => {
  const edge = useEdgeContext() as {source: IHandleData, target: IHandleData}

  return (
    <>
    {edge && 
      <path d={CalculateStraightEdgePath(edge.source, edge.target)} style={{stroke: '#bbb'}}/>
      }
    </>
  )
}

DefaultEdge.displayName = 'TestNode';

export default DefaultEdge