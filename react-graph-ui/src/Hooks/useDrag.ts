import { select } from 'd3-selection';
import { drag } from 'd3-drag';
import type { D3DragEvent, SubjectPosition } from 'd3';
import { useCallback, useEffect, useRef, useState } from "react";
import { useStoreApi } from "./useStoreApi";
import { useStore } from './useStore';
import { IGraphState, IUseDragProps, IXYPosition } from '../Types';

type useDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>;

const selector = (s: IGraphState) => ({
  graphTransform: s.graphTransform,
  updateNodePosition: s.updateNodePosition,
});

const useDrag = ({
  store,
  nodeRef, 
  disabled = false, 
  nodeId,
  position,
  selectNodesOnDrag = false,
}: IUseDragProps) => {
 
    const { graphTransform, updateNodePosition } = store.getState();
    const [dragging, setDragging] = useState<boolean>(false);
    const lastPos = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    const dragFilter = (e: any) => e.target.closest('.flow-ui-noDrag') === null;

    const getProjectedPosition = useCallback((event: useDragEvent, position: IXYPosition) => {
      const x = position.x + event.x / graphTransform.scale;
      const y = position.y + event.y / graphTransform.scale;

      return {x: x, y: y};
    }, [graphTransform.scale]);

    useEffect(() => {
      if(nodeRef?.current){
        const selection = select(nodeRef.current);

        if(disabled){
          selection.on('drag', null);
        } else {
          const dragHandler = drag()

          .on('start', (event: useDragEvent) => {
            setDragging(true);
            updateNodePosition([nodeId], position, true)
          })
          .on('drag', (event: useDragEvent) => {
            const newPos = getProjectedPosition(event, position)
            lastPos.current = newPos
            updateNodePosition([nodeId], newPos, dragging)
          })
          .on('end', (event: useDragEvent) => {
            setDragging(false);
            if(lastPos.current.x && lastPos.current.y){
              updateNodePosition([nodeId], {x: lastPos.current.x, y: lastPos.current.y} , false)
            }
          })
          .subject(() => {
            return {x: selection.attr('x'), y: selection.attr('y')}
          })
          .filter((e) => dragFilter(e))
          
          selection.call(dragHandler);

          return () => {
            selection.on('drag', null);
          }
        }
      }
    }, [disabled, dragging, getProjectedPosition, nodeId, nodeRef, position, store, updateNodePosition]);

  return dragging;
}

export default useDrag
