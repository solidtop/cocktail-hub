import IngredientList from "@/components/IngredientList";
import { Cocktail, Ingredient } from "@/types/cocktail";
import ApiAdapter from "@/utils/ApiAdapter";
import Image from "next/image";

type CocktailProps = {
  params: {
    id: string;
  };
};

function getIngredients(cocktail: Cocktail) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}`;
    const ingredient = cocktail[ingredientKey];
    const measureKey = `strMeasure${i}`;
    const measure = cocktail[measureKey];
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  return ingredients;
}

export default async function CocktailPage({ params }: CocktailProps) {
  const { id } = params;
  const api = new ApiAdapter();
  const cocktail = await api.getCocktail(id);
  if (!cocktail) {
    return;
  }

  const ingredients = getIngredients(cocktail);

  return (
    <main className="max-w-screen-xl mx-auto">
      <h2 className="text-2xl text-center">{cocktail.strDrink}</h2>
      <Image
        src={cocktail.strDrinkThumb}
        alt="Cocktail image"
        width={200}
        height={200}
        className="w-auto mx-auto"
      />

      <section>
        <IngredientList ingredients={ingredients} />
      </section>

      <section>
        <h3>Instructions</h3>
        <p>{cocktail.strInstructions}</p>
      </section>
    </main>
  );
}
