import { NextRequest, NextResponse } from "next/server";
import ApiAdapter from "@/utils/ApiAdapter";
import { Cocktail } from "@/types/cocktail";

export async function GET(req: NextRequest) {
  const api = new ApiAdapter();
  const { searchParams } = new URL(req.url);
  const letter = searchParams.get("letter");
  const category = searchParams.get("category");
  const ingredient = searchParams.get("ingredient");

  let cocktails: Cocktail[] | null = null;
  if (letter) {
    cocktails = await api.getCocktailsByLetter(letter);
  }

  // if (category) {
  //   cocktails = await api.getCocktailsByCategory(letter);
  // }

  if (ingredient) {
    cocktails = await api.getCocktailsByIngredient(ingredient);
  }

  return NextResponse.json(cocktails);
}
