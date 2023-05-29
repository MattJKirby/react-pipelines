import { RefObject, useEffect } from "react";
import { INodeStore } from "../Types";
import * as d3 from "d3-zoom";
import {select} from 'd3-selection'

type useGraphTransformProps = {
  store: INodeStore;
  transformerRef: RefObject<HTMLDivElement | SVGSVGElement>;
}

/**
 * Hook for enabling control and mutation of the graph transform.
 * @param param0 
 * @returns the new graph transform
 */
const useGraphTransform = ({
  store,
  transformerRef
}: useGraphTransformProps) => {
  const { graphTransform, setGraphTransform } = store.getState();
  const zoomFilter = (e: any) => e.target.closest('.flow-ui-noZoom') === null;

  useEffect(() => {
    if(transformerRef.current){
      const zoom = d3.zoom().on("zoom", (event) => {
        const { x, y, k } = event.transform;
        setGraphTransform({scale: k, translateX: x, translateY: y})
 
        event.sourceEvent.preventDefault()
        event.sourceEvent.stopPropagation();
      }).scaleExtent([0.1, 2]).filter(event => zoomFilter(event));
      select(transformerRef.current as Element).call(zoom);
    }
    
  }, [graphTransform, setGraphTransform, transformerRef])

  return graphTransform
}

export default useGraphTransform;