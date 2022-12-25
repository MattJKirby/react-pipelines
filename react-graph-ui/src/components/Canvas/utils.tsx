
/**
 * Method for generating a grid pattern of specific dimensions
 * @param size 
 * @param fill 
 * @returns 
 */
export const createGridDotsPath = (size: number, fill: string): React.ReactElement => {
  return <circle cx={size} cy={size} r={size} fill={fill} />;
};