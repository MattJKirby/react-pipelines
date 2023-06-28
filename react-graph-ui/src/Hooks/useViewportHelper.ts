import { IGraphState, INode } from "../Types";
import { useStoreApi } from "./useStoreApi";
import { useStore } from "./useStore";
import { CalculateGraphTransformForViewport, computeNodeBoundingBox } from "../Components/Graph/utils";
import { boxToRect } from "../Utils";
import { CreateD3ZoomIdentity } from "../Containers/ZoomContainer/utils";

const selector = (s:IGraphState) => {
  return {
    d3Zoom: s.d3Zoom,
    d3Selection: s.d3Selection,
    dimensions: s.graphDimensions,
    zoomExtent: s.zoomExtent,
    translateExtent: s.translateExtent
  }
}

/**
 * Custom hook for accessing common viewport functions such as view fitting, programatic zooming etc
 * @returns 
 */
const useViewportHelper = () => {
  const store = useStoreApi();
  const {d3Zoom, d3Selection, dimensions, zoomExtent, translateExtent} = useStore(selector);

  const ViewportHelperFunctions = () => {
    if(d3Zoom && d3Selection){
      return {
        /**
         * Fits the viewport to the bounding box containing a given selection of nodes.
         * @param nodes 
         */
        fitView: (nodes: INode[], scaleOffset = 0.85) => {
          const transform = CalculateGraphTransformForViewport((boxToRect(computeNodeBoundingBox(nodes))), dimensions, zoomExtent, translateExtent, scaleOffset);
          const transition = d3Selection.transition().duration(400);
          transition.call(d3Zoom.transform, CreateD3ZoomIdentity(transform)).transition();
        }
      }
    }
  }

  return ViewportHelperFunctions;
};

export default useViewportHelper;