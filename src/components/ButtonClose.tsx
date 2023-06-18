import { FC } from "react";

type ButtonCloseProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  size: string;
};

const ButtonClose: FC<ButtonCloseProps> = ({ onClick, size }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 px-1 z-20 bg-backdrop-color rounded"
    >
      <svg height={size} viewBox="0 0 384 512" fill="white">
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
    </button>
  );
};

export default ButtonClose;
