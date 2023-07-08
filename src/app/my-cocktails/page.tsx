import UserCocktailList from "@/components/UserCocktailList";

export const metadata = {
  title: "My cocktails | Cocktail hub",
};

export default async function MyCocktailsPage() {
  return (
    <main>
      <UserCocktailList />
    </main>
  );
}
