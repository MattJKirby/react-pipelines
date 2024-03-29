import { FC, memo } from "react";
import { Dimension, IXYPosition } from "../../Types";

type MapNodeProps = {
  nodeId: string;
  position: IXYPosition;
  dimensions: Dimension;
}

const MapNode: FC<MapNodeProps> = ({
  nodeId,
  position,
  dimensions
}) => {

  return (
    <rect
      key={nodeId}
      x={position.x}
      y={position.y}
      width={dimensions.width}
      height={dimensions.height}
      fill={"#e2e2e2"}
    />  
  )
}

export default memo(MapNode);