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
        setBookmarkIds(payload as string[]);
      }
    };

    getBookmarkIds();
  }, []);

  const postToApi = async (id: string) => {
    const res = await fetch("/api/saved-cocktails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    const payload = await res.json();
    return payload;
  };

  const deleteToApi = async (id: string) => {
    const res = await fetch(`/api/saved-cocktails/${id}`, {
      method: "DELETE",
    });
    const payload = await res.json();
    return payload;
  };

  const handleBookmarkChange = async (id: string) => {
    const bookmarkExists = bookmarkIds.includes(id);
    let updatedBookmarks: string[] = [];
    if (bookmarkExists) {
      const payload = await deleteToApi(id);
      if (payload.success) {
        updatedBookmarks = bookmarkIds.filter((bookmark) => bookmark !== id);
      }
    } else {
      const payload = await postToApi(id);
      if (payload.success) {
        updatedBookmarks = [...bookmarkIds, id];
      }
    }
    setBookmarkIds(updatedBookmarks);
  };

  const checkIsBookmarked = (cocktail: Cocktail) => {
    return bookmarkIds.some((id) => id === cocktail.idDrink);
  };

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center my-4">
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
