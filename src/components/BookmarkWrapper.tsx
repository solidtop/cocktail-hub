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

  useEffect(() => {
    const loadBookmarkId = async (id: string) => {
      const bh = new BookmarkHandler();
      const payload = await bh.load(id);
      setIsBookmarked(payload ? true : false);
    };

    loadBookmarkId(cocktailId);
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
