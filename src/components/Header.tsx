import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfilePanel from "./ProfilePanel";
import Logo from "../../public/logo.svg";

const Header: FC = () => {
  return (
    <header className="flex justify-between items-center py-4">
      <Link href={"/"} className="flex items-center gap-4">
        <Image src={Logo} alt="Logo" width={60} height={60} />
        <h1 className="text-xl hidden md:block">CocktailHub</h1>
      </Link>
      <ProfilePanel />
    </header>
  );
};

export default Header;
