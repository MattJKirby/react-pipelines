import React, { ReactElement, useEffect, useState } from "react"
import { useNodeIOStore } from "../Stores/NodeIOStore"

interface EdgeRendererProps {

}

export const EdgeRenderer = () => {
  const nodeHandles = useNodeIOStore((state) => state.nodeHandles)
  const [edges, setEdges] = useState<any>([])

  // useEffect(() => {
  //   if(nodeHandles[0] !== undefined && nodeHandles[1] !== undefined){
  //     const source = nodeHandles[0].position
  //     const target = nodeHandles[1].position
  //     const edge = (<line key="a" x1={source.x} y1={source.y} x2={target.x} y2={target.y} style={{stroke: 'red'}}/>)
      
  //     setEdges([...edges,])
  //   }

  //   if(edges.)

  // }, [edges, nodeHandles])


  return (
    <svg width={'100%'} height={'100%'}>
      <rect x="200" width="100" height="100" fill="pink" stroke="red" />
      {edges}
    </svg>
  )
}