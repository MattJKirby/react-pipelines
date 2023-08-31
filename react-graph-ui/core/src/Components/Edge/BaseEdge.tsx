import { CSSProperties, FC, PropsWithChildren, memo } from "react"

type BaseEdgeProps = {
  path: string,
  style: CSSProperties,
  interactionWidth: number
}

const BaseEdge: FC<PropsWithChildren<BaseEdgeProps>> = ({
  children,
  path,
  style,
  interactionWidth
}) => {

  return (
    <>
      <path 
        d={path} 
        style={style}
        fill="none"
      />
      {interactionWidth && 
        <path d={path} style={{stroke: 'transparent'}} strokeWidth={interactionWidth}/>
      }
      {children}
    </>  
  )
}

BaseEdge.displayName = 'BaseEdge';

export default memo(BaseEdge)