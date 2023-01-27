import { select } from 'd3-selection';
import { drag } from 'd3-drag';
import type { D3DragEvent, SubjectPosition } from 'd3';
import { useCallback, useEffect, useRef, useState } from "react";
import { IUseDragProps, IXYPosition } from '../Types';
import { nodeSelectHandler } from '../Components/Node/utils';

type useDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>;

const useDrag = ({
  store,
  nodeRef, 
  disabled = false, 
  nodeId,
  position,
  selectOnDrag: selectNodesOnDrag = true,
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
        nodeSelectHandler({id: nodeId, store});
        lastPos.current = {x: parseInt(selection.attr('x')), y: parseInt(selection.attr('y'))};

        if(selectNodesOnDrag){
          nodeSelectHandler({id: nodeId, store: store})
        }
      })
      .on('drag', (event: useDragEvent) => {
        const newPos = getProjectedPosition(event, position)

        if(newPos !== lastPos.current){
          lastPos.current = newPos;
          updateNodePosition([nodeId], newPos, true)
        }
        
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
      .filter((e) => dragFilter(e));

    useEffect(() => {
      if(nodeRef?.current){
        if(disabled){
          selection.on('drag', null);
        } else {
          selection.call(dragHandler);

          return () => {
            selection.on('drag', null);
          }
        }
      }
    }, [disabled, dragHandler, nodeRef, selection]);

    if(lastPos.current.x && lastPos.current.y){
      return lastPos.current;
    } else {
      return position;
    }
    
    
}

export default useDrag
