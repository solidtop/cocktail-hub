"use client";

import useUser from "@/account/hooks/useUser";
import CocktailList from "@/components/CocktailList";
import { Cocktail } from "@/types/cocktail";
import { useEffect, useState } from "react";

type ContentProps = {
  cocktails: Cocktail[];
};

export default function Content({ cocktails }: ContentProps) {
  const { user } = useUser();

  return (
    <main>
      <CocktailList cocktails={cocktails} />
    </main>
  );
}
