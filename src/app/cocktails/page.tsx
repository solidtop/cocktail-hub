import CocktailList from "@/components/CocktailList";
import ApiAdapter from "@/utils/ApiAdapter";

type ResultsProps = {
  searchParams: {
    search?: string;
    letter?: string;
    ingredient?: string;
  };
};

export default async function CocktailsPage({ searchParams }: ResultsProps) {
  const { search = "", letter = "", ingredient = "" } = searchParams;
  const api = new ApiAdapter();
  let results = null;

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
  }

  if (!results) {
    return <main>No results</main>;
  }

  return (
    <main>
      <CocktailList cocktails={results} />
    </main>
  );
}
