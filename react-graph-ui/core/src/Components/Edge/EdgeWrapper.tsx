import { FC, memo, PropsWithChildren } from "react"
import useStoreApi from "../../Hooks/useStoreApi"
import { IEdgeWrapperProps } from "../../Types"
import { edgeSelectHandler } from "./utils"


const EdgeWrapper: FC<PropsWithChildren<IEdgeWrapperProps>> = ({
  id,
  EdgeType,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  enableSelect,
  dragging,
  interactionWidth
}) => {
  const store = useStoreApi();
  const pathDimensions = {width: Math.abs(target.x - source.x), height: Math.abs(target.y - source.y)}
  const style = { stroke: selected ? '#000' : '#ccc'}

  return (
    <g
      style={{width: pathDimensions.width, height: pathDimensions.height, zIndex: dragging? 9999 : 'initial', position: 'absolute', border: '1px solid red'}}
      width={pathDimensions.width}
      height={pathDimensions.height}
      onClickCapture={() => edgeSelectHandler({id, store, disabled: !enableSelect})}
      fill="none"
    >
      <EdgeType
        id={id}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        sourcePosition={source.position}
        targetPosition={target.position}
        selected={selected}
        enableSelect={enableSelect}
        interactionWidth={interactionWidth}
        dragging={dragging}
        style={style}
      />
    </g>
  )
}

export default memo(EdgeWrapper);