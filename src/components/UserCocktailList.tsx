"use client";

import { FC, useEffect, useState } from "react";
import { Cocktail } from "@/types/cocktail";
import UserCocktailCard from "./UserCocktailCard";
import NoResultsMessage from "./NoResultsMessage";
import BookmarkHandler from "@/utils/BookmarkHandler";

type UserCocktailListProps = {
  cocktails: Cocktail[];
};

const UserCocktailList: FC = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCocktails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/saved-cocktails");
        const payload = await res.json();
        if (payload) {
          setCocktails(payload as Cocktail[]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCocktails();
  }, []);

  const handleRemove = async (cocktailId: string) => {
    const bh = new BookmarkHandler();

    try {
      const payload = await bh.delete(cocktailId);
      if (payload.success) {
        setCocktails((prevCocktails) =>
          prevCocktails
            ? prevCocktails.filter(
                (cocktail) => cocktail.idDrink !== cocktailId
              )
            : prevCocktails
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (cocktails.length === 0) {
    return <NoResultsMessage>You have no saved cocktails</NoResultsMessage>;
  }

  return (
    <ul className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center my-20">
      {cocktails.map((cocktail, index) => (
        <UserCocktailCard
          key={index}
          cocktail={cocktail}
          onRemove={handleRemove}
        />
      ))}
    </ul>
  );
};

export default UserCocktailList;
