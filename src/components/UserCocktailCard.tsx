import { Cocktail } from "@/types/cocktail";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonClose from "./ButtonClose";

type UserCocktailCardProps = {
  cocktail: Cocktail;
  onRemove: (id: string) => void;
};

const UserCocktailCard: FC<UserCocktailCardProps> = ({
  cocktail,
  onRemove,
}) => {
  return (
    <li className="relative bg-container-color rounded">
      <ButtonClose onClick={() => onRemove(cocktail.idDrink)} size="2em" />
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
      <h4 className="m-2">{cocktail.strDrink}</h4>
    </li>
  );
};

export default UserCocktailCard;
