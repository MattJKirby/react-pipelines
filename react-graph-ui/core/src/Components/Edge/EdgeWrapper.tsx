import { ComponentType, FC, memo } from "react";
import { IEdgeWrapperProps, EdgeProps } from "../../Types";
import useStoreApi from "../../Hooks/useStoreApi";
import { elementSelectionHandler } from "../Node/utils";

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

    const onEdgeClick = (): void => {
      elementSelectionHandler({id, store, disabled: !enableSelect})
    }

    return (
      <g
        style={{width: pathDimensions.width, height: pathDimensions.height, zIndex: dragging? 9999 : 'initial', position: 'absolute', cursor: 'grab'}}
        className="flow-ui-noZoom"
        width={pathDimensions.width}
        height={pathDimensions.height}
        onClickCapture={onEdgeClick}
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