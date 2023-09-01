import { ComponentType, FC, memo } from "react";
import { IEdgeWrapperProps, EdgeProps } from "../../Types";
import { edgeSelectHandler } from "./utils";
import useStoreApi from "../../Hooks/useStoreApi";

/**
 * Wrapper higher order component 
 * @param EdgeComponent 
 * @returns 
 */
const EdgeWrapper = (EdgeComponent: ComponentType<EdgeProps>) => {
  const EdgeWrapper: FC<IEdgeWrapperProps> = ({
    id,
    source,
    target,
    sourceX,
    sourceY,
    targetX,
    targetY,
    selected,
    enableSelect,
    dragging,
    interactionWidth,
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
        <EdgeComponent
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

  EdgeWrapper.displayName = 'EdgeWrapper'

  return memo(EdgeWrapper)
}

export default EdgeWrapper