"use client";

import { FC } from "react";
import Link from "next/link";
import useUser from "../account/hooks/useUser";
import DropdownMenu from "./DropdownMenu";
import ButtonPrimary from "./ButtonPrimary";
import Spinner from "./Spinner";

const ProfilePanel: FC = () => {
  const { loading, user, logout } = useUser();

  if (loading) {
    return <Spinner size="w-8 h-8" />;
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
      <ul className="flex gap-2 text-lg">
        <li>
          <Link
            href={"/login"}
            className="bg-white bg-opacity-10 px-4 py-2 rounded"
          >
            Log in
          </Link>
        </li>
        <li>
          <Link
            href={"/register"}
            className="bg-primary-color px-4 py-2 rounded"
          >
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ProfilePanel;
