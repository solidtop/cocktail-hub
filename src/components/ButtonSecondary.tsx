import { FC } from "react";

type ButtonSecondaryProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: string;
};

const ButtonSecondary: FC<ButtonSecondaryProps> = ({
  type = "button",
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-gray-700 rounded"
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
