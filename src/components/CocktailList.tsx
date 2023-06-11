"use client";

import useUser from "@/account/hooks/useUser";
import { FC, useEffect, useState } from "react";
import { Cocktail } from "@/types/cocktail";
import CocktailCard from "./CocktailCard";

type CocktailListProps = {
  cocktails: Cocktail[];
};

const CocktailList: FC<CocktailListProps> = ({ cocktails }) => {
  const { user } = useUser();
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);
  const showBookmarks = user ? true : false;

  useEffect(() => {
    const getBookmarkIds = async () => {
      const res = await fetch("/api/saved-cocktails?onlyIds=true");
      const payload = await res.json();
      if (payload) {
        setBookmarkIds(payload);
      }
    };

    getBookmarkIds();
  }, []);

  const handleBookmarkChange = (id: string) => {
    const bookmarkExists = bookmarkIds.includes(id);
    let updatedBookmarks: string[];
    if (bookmarkExists) {
      updatedBookmarks = bookmarkIds.filter((bookmark) => bookmark !== id);
    } else {
      updatedBookmarks = [...bookmarkIds, id];
    }
    setBookmarkIds(updatedBookmarks);
  };

  const checkIsBookmarked = (cocktail: Cocktail) => {
    return bookmarkIds.some((id) => id === cocktail.idDrink);
  };

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center my-20">
      {cocktails.map((cocktail, index) => (
        <CocktailCard
          key={index}
          cocktail={cocktail}
          isBookmarked={checkIsBookmarked(cocktail)}
          onBookmarkChange={handleBookmarkChange}
          showBookmark={showBookmarks}
        />
      ))}
    </ul>
  );
};

export default CocktailList;
