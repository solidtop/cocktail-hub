import { FC } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import ProfilePanel from "./ProfilePanel";

const Header: FC = () => {
  return (
    <header className="flex justify-between items-center p-4">
      <Link href={"/"}>
        <h1 className="text-xl">CocktailHub</h1>
      </Link>
      <ProfilePanel />
    </header>
  );
};

export default Header;
