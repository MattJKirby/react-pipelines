import React, { memo } from "react"
import { INodeProps } from "../../Types";
import { Handle } from "../Handle";
import styles from '../../Styles/Node/DefaultNode.module.css'

const DefaultNode = ({
  id, 
  data, 
  selected
}: INodeProps) => {

  return (
    <>
      <div className={`${styles.RP_DefaultNode__Container} ${selected ? styles['RP_DefaultNode__Container--Selected'] : null}`}>
        <div className={`${styles.RP_DefaultNode__Content} ${styles.RP_DefaultNode__LabelHeader}`}>
          Node Id: {id} 
        </div>


          <Handle id="source" position="bottom"/>

      </div>
    </>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default memo(DefaultNode)