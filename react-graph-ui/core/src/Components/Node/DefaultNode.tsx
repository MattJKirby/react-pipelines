import React, { memo } from "react"
import { INodeProps } from "../../Types";
import Handle from "../Handle";
import styles from '../../Styles/Node/DefaultNode.module.css'

const DefaultNode = ({
  id, 
  data, 
  selected
}: INodeProps) => {

  return (
    <>
      <div className={`${styles.RP_DefaultNode__Container} ${selected ? styles['RP_DefaultNode__Container--Selected'] : null}`}>
        <div className={``}>
          Node Id: {id} 
        </div>
 
        <div style={{width: '100%', display: 'flex', alignItems: 'end', flexDirection: 'column', marginBottom: '16px'}}>
          <Handle id="source" position="right"/>
        </div>
      </div>
    </>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default memo(DefaultNode)