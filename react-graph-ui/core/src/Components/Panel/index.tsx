import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { PanelContainer } from "../../Styles/Panel";

type PanelProps = HTMLAttributes<HTMLDivElement> 

/**
 * Component for creating floating containers on top of the graph view window.
 * @param param0 
 * @returns 
 */
const Panel: FC<PropsWithChildren<PanelProps>> = ({
  style,
  children,
  ...rest
}) => {
  return (
    <div 
      className="RP_Panel" 
      style={{...PanelContainer, ...style}} 
      {...rest}>
        {children}
    </div>
  )
}

export default Panel