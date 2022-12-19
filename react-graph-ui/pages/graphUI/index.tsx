import React from "react"
import FlowCanvas from "../../src/canvas"
import Flow from "../../src/flow"

/**
 * Page for displaing graph UI components
 * @returns 
 */
const graphUI = () => {
  return (
    <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "500px"}}>
      <Flow>
        <FlowCanvas gap={40} size={1} />
      </Flow>    
    </div>
    
  )

}
export default graphUI