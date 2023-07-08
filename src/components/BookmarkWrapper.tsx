"use client";

import useUser from "@/account/hooks/useUser";
import ButtonBookmark from "@/components/ButtonBookmark";
import BookmarkHandler from "@/utils/BookmarkHandler";
import { FC, useEffect, useState } from "react";

type BookmarkWrapperProps = {
  cocktailId: string;
};

const BookmarkWrapper: FC<BookmarkWrapperProps> = ({ cocktailId }) => {
  const { user } = useUser();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const bh = new BookmarkHandler();

  useEffect(() => {
    const loadBookmarkId = async () => {
      const payload = await bh.load(cocktailId);
      setIsBookmarked(payload ? true : false);
    };

    loadBookmarkId();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="absolute top-4 right-4">
      <ButtonBookmark
        cocktailId={cocktailId}
        isBookmarked={isBookmarked}
        onBookmark={(isChecked: boolean) => {
          setIsBookmarked(isChecked);
        }}
      />
    </div>
  );
};

export default BookmarkWrapper;
