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
          <p className={`${styles.RP_DefaultNode__OutputName}`}>Output 1</p>
          <div className={`${styles.RP_DefaultNode__Output}`}>
            <Handle id="source"/>
          </div>
        </div>
      </div>
    </>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default memo(DefaultNode)