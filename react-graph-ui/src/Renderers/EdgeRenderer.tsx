import React, { useEffect, useState } from "react"
import { useEdgeStore } from "../Stores/EdgeStore"
import { useNodeIOStore } from "../Stores/NodeIOStore"


export const EdgeRenderer = () => {
  const nodeHandles = useNodeIOStore((state) => state.nodeHandles)
  const edges = useEdgeStore((state) => state.edges)
  const [handlePos, setHandlePos] = useState({x: 0, y: 0})

  useEffect(() => {
    if(nodeHandles[0] !== undefined){
      
      setHandlePos(nodeHandles[0].position)
    }
    

  }, [nodeHandles])


  return (
    <svg width={'100%'} height={'100%'} overflow="visible">
      {edges.map((edge, index) => {
        return (
       
          <path key={index} d={`M${handlePos.x} ${handlePos.y} L 200 400`} style={{stroke: 'red'}} transform="translate(50px, 30px)"/>
        
        )
      })}
    </svg>
  )
}