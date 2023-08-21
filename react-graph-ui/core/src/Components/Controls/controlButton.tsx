import { FC, PropsWithChildren, memo } from "react";
import { ControlButtonStyles, ControlNameStyles } from "../../Styles/Controls";

type ControlButtonProps = {
  controlFunction: () => void;
  controlName: string;
  disabled?: boolean;
  active?: boolean
}

const ControlButton: FC<PropsWithChildren<ControlButtonProps>> = ({
  controlFunction,
  children,
  controlName,
  disabled = false,
  active = false,
}) => {

  return (
    <button style={{...ControlButtonStyles, borderColor: disabled ? "#ccc" : "initial"}} onClick={controlFunction} disabled={disabled}>
      {children === undefined ? (
        <p style={{...ControlNameStyles, color: disabled || active ? "#ccc" : "initial"}}>{controlName}</p>
      ) : children}
    </button>
  )
};

export default memo(ControlButton);