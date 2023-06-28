import { FC, PropsWithChildren, memo } from "react";
import Panel from "../Panel";
import { IGraphState } from "../../Types";
import { useStore } from "../../Hooks/useStore";
import useViewportHelper from "../../Hooks/useViewportHelper";
import ControlButton from "./controlButton";
import { useStoreApi } from "../../Hooks/useStoreApi";

type ControlsProps = {
  horizontal?: boolean,
  top?: boolean,
  right?: boolean,
}

const selector = (s: IGraphState) => {
  return {
    nodes: s.getNodes(),
    isInteractive: s.enableDraggableNodes,
    zoomExtent: s.zoomExtent,
    transform: s.graphTransform,
    setTransform: s.setGraphTransform
  }
}

const Controls: FC<PropsWithChildren<ControlsProps>> = ({
  horizontal = false,
  top = false,
  right = false,
  children
}) => {
  const {nodes, isInteractive, zoomExtent, transform} = useStore(selector);
  const store = useStoreApi();
  const viewportFunctions = useViewportHelper();

  const handleFitView = () => {
    viewportFunctions()?.fitView(nodes);
  }

  const handleLock = () => {
    store.setState({
      enableDraggableNodes: !isInteractive
    })
  };

  const handleZoomIn = () => viewportFunctions()?.zoomIn();

  const handleZoomOut = () => viewportFunctions()?.zoomOut();

  return (
    <Panel
      style={{bottom: !top ? 0 : "auto", right: right ? 0 : "auto", zIndex: 5}}
    >
      <div style={{
        display: "flex", 
        flexDirection: horizontal ? "row" : "column",
        background: "#FFF",
        padding: "2px"
      }}>
        <ControlButton controlName="Fit" controlFunction={handleFitView}>abc</ControlButton>
        <ControlButton controlName="+" controlFunction={handleZoomIn} disabled={zoomExtent[1] === transform.scale}/>
        <ControlButton controlName="-" controlFunction={handleZoomOut} disabled={zoomExtent[0] === transform.scale}/>
        <ControlButton controlName="Lock" controlFunction={handleLock} active={!isInteractive}/>
        {children}
      </div>
    </Panel>
  )
}

export default memo(Controls)