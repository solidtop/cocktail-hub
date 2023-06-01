import CocktailList from "@/components/CocktailList";
import ApiAdapter from "@/utils/ApiAdapter";

export default async function Home() {
  const api = new ApiAdapter();
  const cocktails = await api.getCocktails();
  console.log(cocktails);

  return (
    <main>
      <CocktailList cocktails={cocktails} />
    </main>
  );
}
