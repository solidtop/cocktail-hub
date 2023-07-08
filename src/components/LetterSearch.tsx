import Link from "next/link";
import { FC } from "react";

const LetterSearch: FC = () => {
  const charCodes = Array.from(Array(26)).map((e, i) => i + 97);
  const letters = charCodes.map((x) => String.fromCharCode(x));

  return (
    <nav className="grid grid-cols-9 xl:flex justify-items-center items-center gap-2 mx-auto mt-20">
      {letters.map((letter, index) => (
        <Link
          key={index}
          href={{ pathname: "/cocktails", search: `letter=${letter}` }}
          className="flex justify-center items-center text-xl text-center bg-slate-800 w-8 h-8 rounded"
        >
          {letter.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
};

export default LetterSearch;
