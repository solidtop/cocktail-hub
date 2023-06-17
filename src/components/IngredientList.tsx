import { FC } from "react";

type IngredientListProps = {
  ingredients: {
    ingredient: string;
    measure: string | null;
  }[];
};

const IngredientList: FC<IngredientListProps> = ({ ingredients }) => {
  return (
    <ul className="list-disc list-inside p-4">
      {ingredients.map((ingredient) => (
        <li>
          {ingredient.measure ? `${ingredient.measure} ` : ""}
          {ingredient.ingredient}{" "}
        </li>
      ))}
    </ul>
  );
};

export default IngredientList;
