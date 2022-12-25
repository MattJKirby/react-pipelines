import create from 'zustand'

/**
 * What we can expect from the transform state object
 */
export interface ITransform {
  scale: number;
  translateX: number;
  translateY: number;
}

/**
 * Properties and methods defined in the transform useTransfromStore hook
 */
interface TransformState {
  transform: ITransform;
  setTransform: (transform: ITransform) => void;
}

/**
 * Store the canvas transformation properties in a zustand store hook
 */
const useTransformStore = create<TransformState>((set) => ({
  transform: {scale: 1, translateX: 0, translateY: 0},
  setTransform: (transform: ITransform) => set({transform})
}))

export default useTransformStore