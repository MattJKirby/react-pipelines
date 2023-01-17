import React, { memo } from "react"
import { INodeProps } from "../../Types";
import { Handle } from "../Handle";
import styles from '../../Styles/Node/DefaultNode.module.css'

const DefaultNode = ({data}: INodeProps) => {

  return (
    <>
      <div className={styles.RP_DefaultNode__Container}>
        <div className={`${styles.RP_DefaultNode__Content} ${styles.RP_DefaultNode__LabelHeader}`}>
          {data?.label}
        </div>

        <div className={`${styles.RP_DefaultNode__Content}`}>
          <Handle id="source"/>
        </div>
      </div>
    </>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default memo(DefaultNode)