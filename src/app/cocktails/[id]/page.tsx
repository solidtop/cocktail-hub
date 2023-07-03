import ButtonBookmark from "@/components/ButtonBookmark";
import BookmarkHandler from "@/utils/BookmarkHandler";
import IngredientList from "@/components/IngredientList";
import { Cocktail } from "@/types/cocktail";
import ApiAdapter from "@/utils/ApiAdapter";
import Image from "next/image";

type CocktailProps = {
  params: {
    id: string;
  };
};

type Ingredient = {
  ingredient: string;
  measure: string;
};

function getIngredients(cocktail: Cocktail) {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}`;
    const ingredient = cocktail[ingredientKey as keyof Cocktail];
    const measureKey = `strMeasure${i}`;
    const measure = cocktail[measureKey as keyof Cocktail];

    if (
      ingredient &&
      typeof ingredient === "string" &&
      typeof measure === "string"
    ) {
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
    <main className="max-w-screen-md mx-auto my-10">
      <h2 className="text-2xl text-left">{cocktail.strDrink}</h2>
      <div className="h-[2px] bg-white bg-opacity-50 rounded"></div>

      <div className="max-w-lg flex mt-4 mb-8 mx-auto relative">
        <Image
          src={cocktail.strDrinkThumb}
          alt="Cocktail image"
          width={1000}
          height={1000}
          className="w-full h-auto rounded"
        />

        <div className="absolute top-4 right-4">
          <ButtonBookmark cocktailId={cocktail.idDrink} />
        </div>
      </div>

      <section>
        <h3 className="text-2xl text-center py-1 bg-container-color rounded">
          Ingredients
        </h3>
        <IngredientList ingredients={ingredients} />
      </section>

      <section>
        <h3 className="text-2xl text-center py-1 bg-container-color rounded">
          Instructions
        </h3>
        <p className="p-4">{cocktail.strInstructions}</p>
      </section>
    </main>
  );
}
