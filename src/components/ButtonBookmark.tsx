"use client";

import useUser from "@/account/hooks/useUser";
import BookmarkHandler from "@/utils/BookmarkHandler";
import { FC, useEffect, useState } from "react";

type ButtonBookmarkProps = {
  cocktailId: string;
  isBookmarked: boolean;
  onBookmark: (isChecked: boolean) => void;
};

const ButtonBookmark: FC<ButtonBookmarkProps> = ({
  cocktailId,
  isBookmarked,
  onBookmark,
}) => {
  const { loading } = useUser();
  const [isChecked, setIsChecked] = useState(false);
  const bh = new BookmarkHandler();

  useEffect(() => {
    setIsChecked(isBookmarked);
  }, [isBookmarked]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleClick = () => {
    if (isChecked) {
      bh.delete(cocktailId);
    } else {
      bh.save(cocktailId);
    }

    setIsChecked((prevState) => !prevState);
    onBookmark(!isChecked);
  };

  return (
    <button
      onClick={handleClick}
      className={`z-10 p-2 max-h-10 ${
        isChecked ? "bg-green-900" : "bg-backdrop-color"
      } rounded`}
    >
      <svg
        height="1.5em"
        viewBox="0 0 384 512"
        className={isChecked ? "fill-green-600" : "fill-white"}
      >
        <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
      </svg>
    </button>
  );
};

export default ButtonBookmark;
