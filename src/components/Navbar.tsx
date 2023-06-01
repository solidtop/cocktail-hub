import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href={"/login"}>Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;