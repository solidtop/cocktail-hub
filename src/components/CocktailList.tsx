import { FC } from "react";
import { Cocktail } from "@/types/cocktail";
import CocktailCard from "./CocktailCard";

type CocktailListProps = {
    cocktails: Cocktail[];
}

const CocktailList: FC<CocktailListProps> = ({ cocktails }) => {
    return (
        <ul className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
            {cocktails.map(cocktail => (
                <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
            ))}
        </ul>
    );
}

export default CocktailList;