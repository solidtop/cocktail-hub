import { Cocktail } from "@/types/cocktail";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonBookmark from "./ButtonBookmark";

type CocktailCardProps = {
  cocktail: Cocktail;
  isBookmarked: boolean;
  showBookmark?: boolean;
  onBookmark: (isChecked: boolean) => void;
};

const CocktailCard: FC<CocktailCardProps> = ({
  cocktail,
  isBookmarked,
  showBookmark,
  onBookmark,
}) => {
  return (
    <li className="relative bg-container-color rounded">
      <Link
        href={`/cocktails/${cocktail.idDrink}`}
        className="absolute inset-0"
      ></Link>
      <Image
        src={cocktail.strDrinkThumb}
        alt="cocktail image"
        width={500}
        height={500}
        className="w-80 rounded"
      ></Image>
      <div className="flex justify-between items-center p-2">
        <h4>{cocktail.strDrink}</h4>
        {showBookmark && (
          <ButtonBookmark
            isBookmarked={isBookmarked}
            cocktailId={cocktail.idDrink}
            onBookmark={onBookmark}
          />
        )}
      </div>
    </li>
  );
};

export default CocktailCard;
