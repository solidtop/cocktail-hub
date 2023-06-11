"use client";

import { FC } from "react";
import Link from "next/link";
import useUser from "../account/hooks/useUser";
import DropdownMenu from "./DropdownMenu";

const ProfilePanel: FC = () => {
  const { loading, user, logout } = useUser();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return (
      <div>
        <div className="">
          <DropdownMenu
            label={user.name}
            icon={
              <svg height="1em" viewBox="0 0 448 512" fill="white">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            }
          >
            <Link href={"/my-cocktails"}>My cocktails</Link>
            <button onClick={() => logout()}>Logout</button>
          </DropdownMenu>
        </div>
      </div>
    );
  }

  return (
    <nav className="ml-auto mr-0">
      <ul className="flex gap-8 text-lg">
        <li>
          <Link href={"/login"}>Log in</Link>
        </li>
        <li>
          <Link href={"/register"}>Sign up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default ProfilePanel;
