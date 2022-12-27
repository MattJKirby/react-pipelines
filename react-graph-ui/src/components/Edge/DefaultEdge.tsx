import React from "react"
import { useEdgeContext } from "../../Contexts/EdgeDataContext";
import { IHandleData } from "../Handle/IHandleData";
import { CalculateStraightPath } from "./utils";

const DefaultEdge = () => {
  const edge = useEdgeContext() as {source: IHandleData, target: IHandleData}

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