"use client";

import useUser from "@/account/hooks/useUser";
import { FC, useEffect, useState } from "react";
import { Cocktail } from "@/types/cocktail";
import CocktailCard from "./CocktailCard";
import BookmarkHandler from "@/utils/BookmarkHandler";

type CocktailListProps = {
  cocktails: Cocktail[];
};

const CocktailList: FC<CocktailListProps> = ({ cocktails }) => {
  const { user } = useUser();
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);
  const showBookmarks = user ? true : false;

  useEffect(() => {
    const loadBookmarkIds = async () => {
      const bh = new BookmarkHandler();
      const payload = await bh.loadAll();
      setBookmarkIds(payload);
    };

    loadBookmarkIds();
  }, []);

  const bh = new BookmarkHandler();

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center my-4">
      {cocktails.map((cocktail) => (
        <CocktailCard
          key={cocktail.idDrink}
          cocktail={cocktail}
          isBookmarked={bh.isBookmarked(bookmarkIds, cocktail.idDrink)}
          showBookmark={showBookmarks}
          onBookmark={(isChecked: boolean) => {
            if (isChecked) {
              setBookmarkIds((prevBookmarkIds) => [
                ...prevBookmarkIds,
                cocktail.idDrink,
              ]);
            } else {
              setBookmarkIds((prevBookmarkIds) =>
                prevBookmarkIds.filter((id) => id !== cocktail.idDrink)
              );
            }
          }}
        />
      ))}
    </ul>
  );
};

export default CocktailList;
