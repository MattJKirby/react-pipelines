import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { PanelContainer } from "../../Styles/Panel";

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  width: number;
  height: number;
}

/**
 * Component for creating floating containers on top of the graph view window.
 * @param param0 
 * @returns 
 */
const Panel: FC<PropsWithChildren<PanelProps>> = ({
  width,
  height,
  style,
  children,
  ...rest
}) => {
  return (
    <div 
      className="RP_Panel" 
      style={{...PanelContainer, ...style, width: width, height: height}} 
      {...rest}>
        {children}
    </div>
  )
}

export default Panel