import CocktailList from "@/components/CocktailList";
import ApiAdapter from "@/utils/ApiAdapter";

export default async function Home() {
  const api = new ApiAdapter();
  const latestCocktails = await api.getLatestCocktails();
  const popularCocktails = await api.getPopularCocktails();

  return (
    <main>
      <section className="my-20">
        <h2 className="text-2xl text-center font-semibold">Latest cocktails</h2>
        <div className="h-[2px] bg-white bg-opacity-50 rounded"></div>
        <CocktailList cocktails={latestCocktails} />
      </section>
      <section className="my-20">
        <h2 className="text-2xl text-center font-semibold">
          Popular cocktails
        </h2>
        <div className="h-[2px] bg-white bg-opacity-50 rounded"></div>
        <CocktailList cocktails={popularCocktails} />
      </section>
    </main>
  );
}
