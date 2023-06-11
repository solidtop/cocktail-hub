import { Category, Cocktail, Ingredient } from "@/types/cocktail";

class ApiAdapter {
  private API_URL: string = "https://thecocktaildb.com/api/json/v1/1";

  async getCocktail(id: string): Promise<Cocktail> {
    const res = await fetch(`${this.API_URL}/lookup.php?i=${id}`);
    const payload = await res.json();
    return payload.drinks[0];
  }

  async getCocktailsByLetter(letter: string): Promise<Cocktail[]> {
    const res = await fetch(`${this.API_URL}/search.php?f=${letter}`);
    const payload = await res.json();
    return payload.drinks;
  }

  async getCocktailsByName(name: string): Promise<Cocktail[]> {
    const res = await fetch(`${this.API_URL}/search.php?s=${name}`);
    const payload = await res.json();
    return payload.drinks;
  }

  async getCocktailsByIngredient(ingredient: string): Promise<Cocktail[]> {
    const res = await fetch(
      `${this.API_URL}/filter.php?i=${ingredient.replace(/\s/g, "_")}`
    );
    const payload = await res.json();
    return payload.drinks;
  }

  async getIngredientByName(name: string): Promise<Ingredient> {
    const res = await fetch(`${this.API_URL}/search.php?i=${name}`);
    const payload = await res.json();
    return payload.ingredients[0];
  }

  async getIngredients(): Promise<Ingredient[]> {
    const res = await fetch(`${this.API_URL}/list.php?i=list`);
    const payload = await res.json();
    return payload.drinks;
  }

  async getCategories(): Promise<Category[]> {
    const res = await fetch(`${this.API_URL}/list.php?c=list`);
    const payload = await res.json();
    return payload.drinks;
  }

  async getCocktailsByIds(ids: number[]): Promise<Cocktail[]> {
    const promises = ids.map((id) =>
      fetch(`${this.API_URL}/lookup.php?i=${id}`)
    );
    const responses = await Promise.all(promises);
    const payload = await Promise.all(responses.map((res) => res.json()));
    return payload.map((item) => item.drinks).flat();
  }
}

export default ApiAdapter;
