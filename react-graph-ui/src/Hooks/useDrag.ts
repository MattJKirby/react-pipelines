import { select } from 'd3-selection';
import { drag } from 'd3-drag';
import type { D3DragEvent, SubjectPosition } from 'd3';
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useStoreApi } from "./useStoreApi";
import { useStore } from './useStore';
import { IGraphState, IXYPosition } from '../Types';

type useDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>;

interface IUseDragProps {
  nodeRef: RefObject<Element>;
  disabled?: boolean;
  nodeId: string;
  position: IXYPosition;
  selectNodesOnDrag?: boolean;
}

const selector = (s: IGraphState) => ({
  updateNodePosition: s.updateNodePosition,
});

const useDrag = ({
  nodeRef, 
  disabled = false, 
  nodeId,
  position,
  selectNodesOnDrag = false,
}: IUseDragProps) => {
    const store = useStoreApi();
    const state = useStore(selector);
    const [dragging, setDragging] = useState<boolean>(false);
    const lastPos = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    const getProjectedPosition = useCallback((event: useDragEvent, position: IXYPosition) => {
      const { graphTransform } = store.getState();
      const x = position.x + event.x / graphTransform.scale;
      const y = position.y + event.y / graphTransform.scale;

      return {x: x, y: y};
    }, [store]);

    useEffect(() => {
      if(nodeRef?.current){
        const selection = select(nodeRef.current);

        if(disabled){
          selection.on('drag', null);
        } else {
          const dragHandler = drag()

          .on('start', (event: useDragEvent) => {
            setDragging(true);
            state.updateNodePosition([nodeId], position, true)
          })
          .on('drag', (event: useDragEvent) => {
            const newPos = getProjectedPosition(event, position)
            lastPos.current = newPos
            state.updateNodePosition([nodeId], newPos, dragging)
          })
          .on('end', (event: useDragEvent) => {
            setDragging(false);
            if(lastPos.current.x && lastPos.current.y){
              state.updateNodePosition([nodeId], {x: lastPos.current.x, y: lastPos.current.y} , false)
            }
          })
          .subject(() => {
            return {x: selection.attr('x'), y: selection.attr('y')}
          })
        
        // .filter((e) => dragFilter(e)).on('end', () => onDrag(false));
          

          selection.call(dragHandler);


          return () => {
            selection.on('drag', null);
          }
        }
      }
    }, [disabled, dragging, getProjectedPosition, nodeId, nodeRef, position, state, store]);

  return dragging;
}

export default useDrag
