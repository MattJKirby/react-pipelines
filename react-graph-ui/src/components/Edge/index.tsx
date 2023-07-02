import { FC, memo, PropsWithChildren } from "react"
import { useStoreApi } from "../../Hooks/useStoreApi"
import { IEdgeContainerProps } from "../../Types"
import { edgeSelectHandler } from "./utils"


const Edge: FC<PropsWithChildren<IEdgeContainerProps>> = ({
  children,
  id,
  source, 
  target,
  enableSelect,
  path,
  interactionWidth,
  dragging
}) => {
  const store = useStoreApi();
  const pathDimensions = {width: Math.abs(target.x - source.x), height: Math.abs(target.y - source.y)}

  return (
    <g
      style={{width: pathDimensions.width, height: pathDimensions.height, zIndex: dragging? 9999 : 'initial', position: 'absolute'}}
      width={pathDimensions.width}
      height={pathDimensions.height}
      onClickCapture={() => edgeSelectHandler({id, store, disabled: !enableSelect})}
      fill="none"
    >
      <path d={path} style={{stroke: 'transparent'}} strokeWidth={interactionWidth}/>
      {children}
    </g>
  )
}

export default memo(Edge);