"use client";

import useUser from "@/account/hooks/useUser";
import BookmarkHandler from "@/utils/BookmarkHandler";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

type ButtonBookmarkProps = {
  cocktailId: string;
  isBookmarked?: boolean;
  onBookmark?: (isChecked: boolean) => void;
};

const ButtonBookmark: FC<ButtonBookmarkProps> = ({
  cocktailId,
  isBookmarked,
  onBookmark,
}) => {
  const { loading } = useUser();
  const [isChecked, setIsChecked] = useState(false);
  const bh = new BookmarkHandler();

  if (isBookmarked !== undefined) {
    useEffect(() => {
      setIsChecked(isBookmarked);
    }, [isBookmarked]);
  } else {
    useEffect(() => {
      const loadBookmarkId = async () => {
        const payload = await bh.load(cocktailId);
        setIsChecked(payload ? true : false);
      };

      loadBookmarkId();
    }, []);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleClick = async () => {
    if (isChecked) {
      await bh.delete(cocktailId);
      setIsChecked(false);
    } else {
      await bh.save(cocktailId);
      setIsChecked(true);
    }

    if (onBookmark) {
      onBookmark(isChecked);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`z-10 p-2 max-h-10 ${
        isChecked ? "bg-green-600 bg-opacity-20" : "bg-backdrop-color"
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
