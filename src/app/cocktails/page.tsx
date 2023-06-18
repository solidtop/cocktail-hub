import CocktailList from "@/components/CocktailList";
import NoResultsMessage from "@/components/NoResultsMessage";
import { Cocktail } from "@/types/cocktail";
import ApiAdapter from "@/utils/ApiAdapter";

type ResultsProps = {
  searchParams: {
    search?: string;
    letter?: string;
    ingredient?: string;
    category?: string;
  };
};

export default async function CocktailsPage({ searchParams }: ResultsProps) {
  const {
    search = "",
    letter = "",
    ingredient = "",
    category = "",
  } = searchParams;
  const api = new ApiAdapter();
  let results: Cocktail[] | null = null;

  switch (true) {
    case Boolean(search):
      results = await api.getCocktailsByName(search);
      break;
    case Boolean(letter):
      results = await api.getCocktailsByLetter(letter);
      break;
    case Boolean(ingredient):
      results = await api.getCocktailsByIngredient(ingredient);
      break;
    case Boolean(category):
      results = await api.getCocktailsByCategory(category);
      break;
  }

  if (!results) {
    return (
      <main>
        <NoResultsMessage>No results</NoResultsMessage>
      </main>
    );
  }

  const term = (search || letter || ingredient || category).replaceAll(
    "_",
    " "
  );

  return (
    <main>
      <h2 className="text-lg">Results for "{term}"</h2>

      <CocktailList cocktails={results} />
    </main>
  );
}
