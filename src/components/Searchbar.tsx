"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";

const Searchbar: FC = () => {
  const [text, setText] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    if (text) {
      router.push(`/cocktails?search=${text.replace(/\s/g, "_")}`);
      setText("");
    }
  };

  return (
    <form
      id="form"
      onSubmit={(ev) => {
        ev.preventDefault();
        handleSearch();
      }}
      className="flex justify-center gap-4"
    >
      <label htmlFor="search" className="hidden">
        Search for cocktails
      </label>
      <input
        className="text-black w-full md:w-1/2 px-4 py-2 rounded"
        type="search"
        name="cocktail-search"
        id="search"
        placeholder="Search for cocktails"
        value={text}
        onChange={(ev) => setText(ev.target.value)}
      />
    </form>
  );
};

export default Searchbar;
