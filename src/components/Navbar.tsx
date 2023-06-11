import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
  return (
    <nav className="">
      <ul className="flex gap-8 text-lg">
        <li>
          <Link href={"#"}>Page1</Link>
        </li>
        <li>
          <Link href={"#"}>Page2</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
