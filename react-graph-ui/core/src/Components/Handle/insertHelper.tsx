import { FC, PropsWithChildren } from "react";
import { Position } from "../../Types";
import { getInsertPathBounds } from "./utils";

type InsertHelperProps = {
  position: Position,
  handleElement: HTMLElement,
  pathLength?: number
}

const InsertHelper: FC<PropsWithChildren<InsertHelperProps>> = ({
  position,
  handleElement,
  pathLength = 25,
  children
}) => {
  const pathBounds = getInsertPathBounds(position, handleElement, pathLength);

  return (
    <div>
      <svg
        width = {2 * pathLength}
        height = {2 * pathLength}
        viewBox="-50 -50 100 100"
        style={{
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      >
        <path 
          d={`M${pathBounds[0]} ${pathBounds[1]} L${pathBounds[2]} ${pathBounds[3]}`}
          // stroke={"#ccc"}
          strokeDasharray="2 1"
        />
      </svg>
      <div
        style={{
          top: `calc(50% + ${pathBounds[3]}px)`,
          left: `calc(50% + ${pathBounds[2]}px)`,
          position: "absolute",
          transform: 'translate(-50%, -50%)',
        }}
      >

{children}

        
      </div>
    </div>
  )
}

export default InsertHelper;