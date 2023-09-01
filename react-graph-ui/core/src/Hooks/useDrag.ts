import { select } from 'd3-selection';
import { drag } from 'd3-drag';
import type { D3DragEvent, SubjectPosition } from 'd3';
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { IUseDragProps, IXYPosition } from '../Types';

type useDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>;

const useDrag = ({
  store,
  nodeRef, 
  disabled = false, 
  nodeId,
  position
}: IUseDragProps) => {
    const { graphTransform, updateNodePosition } = store.getState();
    const [dragging, setDragging] = useState<boolean>(false);
    const lastPos = useRef<{ x: number | null; y: number | null; }>({ x: null, y: null });
    const selection = select(nodeRef.current as Element)

    const dragFilter = (e: any) => e.target.closest('.flow-ui-noDrag') === null;

    const getProjectedPosition = useCallback((event: useDragEvent, position: IXYPosition) => {
      const x = position.x + event.x / graphTransform.scale;
      const y = position.y + event.y / graphTransform.scale;

      return {x, y};
    }, [graphTransform.scale]);

    const dragHandler = drag()
      .on('start', (event: useDragEvent) => {
        setDragging(true);
        const newPos = getProjectedPosition(event, position)
        lastPos.current = newPos;
      })
      .on('drag', (event: useDragEvent) => {
        const newPos = getProjectedPosition(event, position)

        if(newPos !== lastPos.current){
          lastPos.current = newPos;
          updateNodePosition([{id: nodeId, position: newPos, dragging: true}])
        }
        
      })
      .on('end', () => {
        setDragging(false);
        if(lastPos.current.x !== null && lastPos.current.y !== null){
          updateNodePosition([{id: nodeId, position: {x: lastPos.current.x, y: lastPos.current.y}, dragging: false}]);
        }
      })
      .subject(() => {
        return {x: selection.attr('x'), y: selection.attr('y')}
      })
      .filter((e) => dragFilter(e));

      useEffect(() => {
        const nodeElement = nodeRef.current;
        if (nodeElement) {
          const dragSelection = select(nodeElement);
      
          if (disabled) {
            dragSelection.on('.drag', null); // Remove all drag event listeners
          } else {
            dragSelection.call(dragHandler);
          }
        }
      }, [disabled, dragHandler, nodeRef]);

  return dragging;
};

export default useDrag;
