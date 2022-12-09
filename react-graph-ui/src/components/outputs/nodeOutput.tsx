import { majorScale, minorScale, Pane, ChevronRightIcon, IconButton } from "evergreen-ui"
import { createRef, RefObject, useEffect, useRef, useState } from "react"

interface NodeOutputProps {
  output: string
  containerRef: RefObject<HTMLDivElement>
}

export const NodeOutput = ({output, containerRef}: NodeOutputProps) => {
  const handleRef = createRef<HTMLDivElement>()
  const [handlePosition, setHandlePosition] = useState<{x: any, y: any}>({x: 0, y: 0})

  useEffect(() => {
    const containerPosition = containerRef.current?.getBoundingClientRect()
    const handlePosition = handleRef.current?.getBoundingClientRect()
    const relativeX = handlePosition?.x - containerPosition?.x
    const relativeY = handlePosition?.y - containerPosition?.y
    console.log(relativeX, relativeY)
  },[containerRef, handleRef])




 const handleDrag = (event) =>{
      event.preventDefault()
       event.stopPropagation()
    console.log("DRAG")
  }

  return (
    <Pane display='flex' justifyContent='space-between' onMouseDown={(e) => handleDrag(e)}>
      <Pane margin={majorScale(1)}>
        {output}
      </Pane>
      
      
      <IconButton ref={handleRef} icon={ChevronRightIcon} className={'flow-ui-noDrag flow-ui-noZoom'} appearance='minimal' position='relative' left='40px'  onClick={() => null}/>
    </Pane>
  )
}