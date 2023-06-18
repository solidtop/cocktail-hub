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
      className="flex justify-center gap-4 md:w-1/2 mx-auto relative"
    >
      <svg
        height="1em"
        viewBox="0 0 512 512"
        className="absolute top-3 left-4 fill-white"
      >
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </svg>
      <label htmlFor="search" className="hidden">
        Search for cocktails
      </label>
      <input
        className="text-white w-full pl-12 pr-4 py-2 rounded-full bg-backdrop-color"
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
