import { Cocktail } from "@/types/cocktail";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

type CocktailCardProps = {
    cocktail: Cocktail;
}

const CocktailCard: FC<CocktailCardProps> = ({ cocktail }) => {
    return (
        <li className="relative">
            <Link href={`/cocktails/${cocktail.idDrink}`} className="absolute inset-0"></Link>
            <Image src={cocktail.strDrinkThumb} alt="cocktail image" width={200} height={200} className="w-full rounded"></Image> 
            <h4>{cocktail.strDrink}</h4>
        </li>
    );
} 

export default CocktailCard;
        
