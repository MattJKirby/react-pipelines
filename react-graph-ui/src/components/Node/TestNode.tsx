import { memo } from "react";
import { INodeProps } from "../../Types";
import { Handle } from "../Handle";

const TestNode = ({data}: INodeProps) => {
  return (
    <>
      (Test: {data?.test})
      <Handle id="target" type="target" />
    </>
  )
}

TestNode.displayName = 'TestNode';

export default memo(TestNode)