"use client";

import RegisterForm from "@/account/components/RegisterForm";
import useUser from "@/account/hooks/useUser";
import { useRouter } from "next/navigation";

export default function Content() {
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    return <h2>You are already logged in</h2>;
  }

  return (
    <main className="max-w-xl mx-auto mt-20 mb-40">
      <h1 className="text-xl font-semibold text-center my-4">Sign up</h1>

      <RegisterForm
        onRegisterComplete={() => {
          router.push("/");
        }}
      />
    </main>
  );
}
