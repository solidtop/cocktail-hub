import { FC } from "react";

type ButtonPrimaryProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: string;
};

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  type = "button",
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-primary-color rounded"
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
