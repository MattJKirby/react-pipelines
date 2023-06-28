import * as d3 from "d3-zoom";
import { CoordinateExtent, ITransform } from "../../Types";

export const CreateD3ZoomIdentity = (transform: ITransform) => {
  const { translateX, translateY, scale } = transform;
  return d3.zoomIdentity.translate(translateX, translateY).scale(scale);
}

export const ConvertCoordinateExtentToD3Style = (extent: CoordinateExtent): CoordinateExtent => {
  const [[xMin, xMax], [yMin, yMax]] = extent;
  return [[xMin, yMin], [xMax, yMax]];
};