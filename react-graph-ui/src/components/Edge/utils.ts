import { PathTypeMap, SelectHandlerProps } from "../../Types"
import { CalculateBezierPath, CalculateStraightPath } from "./pathTypes";

export const edgeSelectHandler = ({
  id,
  store,
  disabled = false,
  unselect = true
}: SelectHandlerProps) => {
  const { updateSelectedEdges, resetSelectedEdges, edgeInternals } = store.getState();
  const edge = edgeInternals.get(id);

  if(!disabled){
    if(!edge?.selected){
      resetSelectedEdges();
      updateSelectedEdges([{id, selected: true}])
    } else if (unselect){
      updateSelectedEdges([{id, selected: false}])
    }
  }
};

export const edgePathTypeMap: PathTypeMap = new Map([
  ['straight', CalculateStraightPath],
  ['bezier', CalculateBezierPath]
]);

