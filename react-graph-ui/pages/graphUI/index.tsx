import React from "react"
import Flow from "../../src/flow"

/**
 * Page for displaing graph UI components
 * @returns 
 */
const graphUI = () => {
  return (
    <div style={{flex: '1', overflow: "hidden", margin: "5rem", height: "500px"}}>
      <Flow />    
    </div>
    
  )

}
export default graphUI