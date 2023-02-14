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
  const pathDimensions = {width: Math.abs(target.position.x - source.position.x), height: Math.abs(target.position.y - source.position.y)}

  return (
    <g
      style={{width: pathDimensions.width, height: pathDimensions.height, zIndex: dragging? 9999 : 'initial', position: 'absolute'}}
      width={pathDimensions.width}
      height={pathDimensions.height}
      onClickCapture={() => edgeSelectHandler({id, store, disabled: !enableSelect})}
    >
      <path d={path} style={{stroke: 'transparent'}} strokeWidth={interactionWidth}/>
      {children}
    </g>
  )
}

export default memo(Edge);