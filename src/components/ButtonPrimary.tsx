import { FC } from "react";

type ButtonPrimaryProps = {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  children: string;
};

const ButtonPrimary: FC<ButtonPrimaryProps> = ({ type, onClick, children }) => {
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

export default ButtonPrimary;
