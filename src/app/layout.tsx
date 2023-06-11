import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Searchbar from "@/components/Searchbar";
import LetterSearch from "@/components/LetterSearch";
import DropdownMenu from "@/components/DropdownMenu";
import ApiAdapter from "@/utils/ApiAdapter";
import UserProvider from "@/account/components/UserProvider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cocktail hub",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const api = new ApiAdapter();
  const ingredients = await api.getIngredients();
  const categories = await api.getCategories();
  const ingredientItems = ingredients.map((ingredient) => {
    return {
      label: ingredient.strIngredient1,
      href: {
        pathname: "/cocktails",
        search: `ingredient=${ingredient.strIngredient1.replace(/\s/g, "_")}`,
      },
    };
  });
  const categoryItems = categories.map((category) => {
    return {
      label: category.strCategory,
      href: {
        pathname: "/cocktails",
        search: `category=${category.strCategory.replace(/\s/g, "_")}`,
      },
    };
  });

  return (
    <html lang="en">
      <body className={inter.className + " max-w-screen-2xl mx-auto p-4"}>
        <UserProvider>
          <Header />
          <Searchbar />
          <section className="flex flex-col md:flex-row justify-center gap-2 my-4">
            <DropdownMenu label="Search by ingredient" responsive={true}>
              {ingredientItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </DropdownMenu>
            <DropdownMenu label="Categories" responsive={true}>
              {categoryItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </DropdownMenu>
          </section>
          {children}
          <section className="flex justify-center">
            <LetterSearch />
          </section>
        </UserProvider>
      </body>
    </html>
  );
}