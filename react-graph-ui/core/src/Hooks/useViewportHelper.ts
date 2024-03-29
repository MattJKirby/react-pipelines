import { IGraphState, INode } from "../Types";
import { useStore } from "./useStore";
import { CalculateGraphTransformForViewport, computeNodeBoundingBox } from "../Components/Graph/utils";
import { boxToRect, clamp } from "../Utils";
import { CreateD3ZoomIdentity } from "../Containers/ZoomContainer/utils";

const selector = (s:IGraphState) => {
  return {
    d3Zoom: s.d3Zoom,
    d3Selection: s.d3Selection,
    dimensions: s.graphDimensions,
    zoomExtent: s.zoomExtent,
    translateExtent: s.translateExtent,
    transform: s.graphTransform
  }
}

/**
 * Custom hook for accessing common viewport functions such as view fitting, programatic zooming etc
 * @returns 
 */
const useViewportHelper = () => {
  const {d3Zoom, d3Selection, dimensions, zoomExtent, translateExtent, transform} = useStore(selector);
  

  const ViewportHelperFunctions = () => {
    if(d3Zoom && d3Selection){
      const zoomIncrementCount = 4;
      const intervalSize = Math.pow(zoomExtent[1] / zoomExtent[0], 1 / zoomIncrementCount);
      return {
        /**
         * Fits the viewport to the bounding box containing a given selection of nodes.
         * @param nodes 
         */
        fitView: (nodes: INode[], scaleOffset = 0.5) => {
          const transition = d3Selection.transition().duration(200);
          const transform = CalculateGraphTransformForViewport((boxToRect(computeNodeBoundingBox(nodes))), dimensions, zoomExtent, translateExtent, scaleOffset);
          transition.call(d3Zoom.transform, CreateD3ZoomIdentity(transform)).transition();
        },
        /**
         * Programatically increase the viewport scale.
         * @param incrementCount 
         */
        zoomIn: () => {
          const transition = d3Selection.transition().duration(100);
          const nextZoomIncrement = clamp(Math.round(transform.scale * intervalSize * 5) / 5, zoomExtent[0], zoomExtent[1]);
          transition.call(d3Zoom.scaleTo, nextZoomIncrement).transition();
          
        },
        /**
         * Programatically decrease the viewport scale.
         */
        zoomOut: () => {
          const transition = d3Selection.transition().duration(100);
          const previousZoomIncrement = clamp(Math.round(transform.scale / intervalSize * 5) / 5, zoomExtent[0], zoomExtent[1]);
          transition.call(d3Zoom.scaleTo, previousZoomIncrement).transition();
        }
      }
    }
  }

  return ViewportHelperFunctions;
};

export default useViewportHelper;