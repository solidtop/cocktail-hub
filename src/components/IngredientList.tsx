import { FC } from "react";

type IngredientListProps = {
  ingredients: {
    ingredient: string;
    measure: string | null;
  }[];
};

const IngredientList: FC<IngredientListProps> = ({ ingredients }) => {
  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li>
          {ingredient.ingredient}{" "}
          {ingredient.measure ? `: ${ingredient.measure}` : ""}
        </li>
      ))}
    </ul>
  );
};

export default IngredientList;
