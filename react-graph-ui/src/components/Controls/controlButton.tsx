import { FC, PropsWithChildren, ReactNode, memo } from "react";
import { ControlButtonStyles, ControlNameStyles } from "../../Styles/Controls";

type ControlButtonProps = {
  controlFunction: () => void;
  buttonNode?: ReactNode;
  controlName: string;
  
}

const ControlButton: FC<PropsWithChildren<ControlButtonProps>> = ({
  controlFunction,
  buttonNode,
  controlName
}) => {

  return (
    <button style={ControlButtonStyles} onClick={controlFunction}>
      {buttonNode === undefined ? (
        <p style={ControlNameStyles}>{controlName}</p>
      ) : (
        <>{buttonNode}</>
      )}
    </button>
  )
};

export default memo(ControlButton);