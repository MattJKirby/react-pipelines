import { drag, select } from "d3";
import type { D3DragEvent, SubjectPosition } from 'd3';
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useStoreApi } from "./useStoreApi";

type useDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>;

interface IUseDragProps {
  nodeRef: RefObject<Element>;
  disabled: boolean;
  nodeId: string;
  selectNodesOnDrag: boolean;
}

const 

const useDrag = ({
  nodeRef, 
  disabled = false, 
  nodeId,
  selectNodesOnDrag = false,
}: IUseDragProps) => {
    const store = useStoreApi();
    const [dragging, setDragging] = useState<boolean>(false);
    const lastPos = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    const getProjectedPointerPos = useCallback(({ sourceEvent }: useDragEvent) => {
      const { graphTransform } = store.getState();
      const x = sourceEvent.touches ? sourceEvent.touches[0].clientX : sourceEvent.clientX;
      const y = sourceEvent.touches ? sourceEvent.touches[0].clientY : sourceEvent.clientY;

      const pointerPos = {
        x: (x - graphTransform.translateX) / graphTransform.scale,
        y: (y - graphTransform.translateY) / graphTransform.scale,
      };

      return pointerPos;
    }, [store]);

    useEffect(() => {
      if(nodeRef.current){
        const selection = select(nodeRef.current);

        if(disabled){
          selection.on('drag', null);
        } else {
          const dragHandler = drag()
          .on('start', (event: useDragEvent) => {
            setDragging(true)
            const { getNodeById, updateNodePosition } = store.getState();
            const node = getNodeById(nodeId);

            lastPos.current = getProjectedPointerPos(event)

            if(node != undefined){
              updateNodePosition([node.id], node?.position, true)
            }
          })
          .on('drag', (event: useDragEvent) => {
            setDragging(true)
            const pointerPos = getProjectedPointerPos(event)

          })
        }
      }
    })

}

export default useDrag
