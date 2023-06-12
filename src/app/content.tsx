"use client";

import CocktailList from "@/components/CocktailList";
import { Cocktail } from "@/types/cocktail";

type ContentProps = {
  cocktails: Cocktail[];
};

export default function Content({ cocktails }: ContentProps) {
  return (
    <main>
      <CocktailList cocktails={cocktails} />
    </main>
  );
}
