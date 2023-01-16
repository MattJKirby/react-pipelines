
/**
 * Method for generating a dotted grid pattern of specific dimensions
 * @param size 
 * @param fill 
 * @returns 
 */
export const createGridDotsPath = (size: number, fill: string): React.ReactElement => {
  return <circle cx={size} cy={size} r={size} fill={fill} />;
};

/**
 * Method for creating grid pattern
 * @param size 
 * @param stroke 
 * @returns 
 */
export const createGridLinesPath = (size: number, stroke: string): React.ReactElement => {
  return <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke={stroke} strokeWidth="1"/>
}