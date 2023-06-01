import { Cocktail } from "@/types/cocktail";

class ApiAdapter {
    API_URL: string = "https://thecocktaildb.com/api/json/v1/1";

    async getCocktail(id: string): Promise<Cocktail> {
        const res = await fetch(`${this.API_URL}/lookup.php?i=${id}`);
        const payload = await res.json();
        return payload.drinks;   
    }
    async getCocktails(): Promise<Cocktail[]> {
        const res = await fetch(`${this.API_URL}/search.php?f=a`);
        const payload = await res.json();
        return payload.drinks;
    }
}

export default ApiAdapter;