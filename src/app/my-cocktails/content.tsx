"use client";

import CocktailList from "@/components/CocktailList";
import { Cocktail } from "@/types/cocktail";
import { useEffect, useState } from "react";

export default function Content() {
  const [cocktails, setCocktails] = useState<Cocktail[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCocktails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/saved-cocktails");
        const payload = await res.json();
        setCocktails(payload);
        console.log(payload);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCocktails();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!cocktails) {
    return <p>You have no saved cocktails</p>;
  }

  return (
    <main>
      <h1>My cocktails</h1>

      <CocktailList cocktails={cocktails} />
    </main>
  );
}
