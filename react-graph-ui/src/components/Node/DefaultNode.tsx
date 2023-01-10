import React, { memo } from "react"
import { INodeProps } from "../../Types";

import { Handle } from "../Handle";

const DefaultNode = ({data}: INodeProps) => {

  return (
    <>
      {data?.label}
      <Handle id="source"/>
    </>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default memo(DefaultNode)