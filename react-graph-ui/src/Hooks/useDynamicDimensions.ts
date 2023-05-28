import { RefObject, useCallback, useEffect, useState } from "react"
import { Dimension } from '../Types/generic'

type useDimensionsProps = {
  itemRef: RefObject<HTMLElement>
}

/**
 * Hook for obtaining dynamic dimensions of a html element
 * @param param0 
 * @returns 
 */
const useDynamicDimensions = ({
  itemRef
}: useDimensionsProps) => {
  const [dimensions, setDimensions] = useState<Dimension>({width: 0, height: 0});

  const getDimensions = useCallback((): Dimension => {
      return {width: itemRef.current?.offsetWidth || 0, height:  itemRef.current?.offsetHeight || 0}
  },[itemRef])

  useEffect(() => {
    const handleResize = () => setDimensions(getDimensions());

    if(itemRef.current){
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getDimensions, itemRef])

  return dimensions;
}

export default useDynamicDimensions;