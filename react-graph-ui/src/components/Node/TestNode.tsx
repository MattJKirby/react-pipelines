import { memo } from "react";
import { INodeProps } from "../../Types";
import { Handle } from "../Handle";

const TestNode = ({data}: INodeProps) => {
  return (
    <>
      <div
        style={{padding: "10px", border: "1px solid red", display: "flex", alignItems: "center", justifyContent: "center"}}
      >
        (Test: {data?.test})
        <Handle id="target" type="source" position="right"/>
        <Handle id="target" type="target" position="left"/>
      </div>
      
    </>
  )
}

TestNode.displayName = 'TestNode';

export default memo(TestNode)