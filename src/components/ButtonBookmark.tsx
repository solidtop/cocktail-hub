"use client";

import useUser from "@/account/hooks/useUser";
import { FC } from "react";

type ButtonBookmarkProps = {
  isBookmarked: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const ButtonBookmark: FC<ButtonBookmarkProps> = ({ isBookmarked, onClick }) => {
  const { loading } = useUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <button onClick={onClick} className="z-20">
      <svg
        height="1.5em"
        viewBox="0 0 384 512"
        fill={isBookmarked ? "blue" : "white"}
      >
        <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
      </svg>
    </button>
  );
};

export default ButtonBookmark;
