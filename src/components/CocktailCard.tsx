import { Cocktail } from "@/types/cocktail";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonBookmark from "./ButtonBookmark";

type CocktailCardProps = {
  cocktail: Cocktail;
  isBookmarked: boolean;
  onBookmarkChange: (id: string) => void;
  showBookmark: boolean;
};

const CocktailCard: FC<CocktailCardProps> = ({
  cocktail,
  isBookmarked,
  onBookmarkChange,
  showBookmark,
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
        width={200}
        height={200}
        className="w-full rounded"
      ></Image>
      <div className="flex justify-between items-center p-2">
        <h4>{cocktail.strDrink}</h4>
        {showBookmark && (
          <ButtonBookmark
            isBookmarked={isBookmarked}
            onClick={() => onBookmarkChange(cocktail.idDrink)}
          />
        )}
      </div>
    </li>
  );
};

export default CocktailCard;
