import { memo } from "react";
import { INodeProps } from "../../Types";
import Handle from "../Handle";

const TestNode = ({data}: INodeProps) => {
  return (
    <div style={{ border: "1px solid red", fontSize: 'small', width: '150px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ marginBottom: '4px' }}>
        Test: {data?.test}
      </div>

      <div style={{marginBottom: '16px'}}>
        <Handle id="target" type="target" position="left"/>
      </div>
    </div>
  )
}

TestNode.displayName = 'TestNode';

export default memo(TestNode)