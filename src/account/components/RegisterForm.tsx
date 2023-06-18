"use client";

import { FC, FormEvent, useEffect, useState } from "react";
import InputField from "../../components/InputField";
import ButtonPrimary from "../../components/ButtonPrimary";
import { ZodFormattedError } from "zod";
import { getRegisterSchema } from "@/utils/validation";
import useUser from "../hooks/useUser";

export type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormProps = {
  onRegisterComplete: () => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ onRegisterComplete }) => {
  const { register } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ZodFormattedError<FormData> | null>(
    null
  );

  useEffect(() => {
    setErrors(null);
  }, [name, email, password, confirmPassword]);

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const registerSchema = getRegisterSchema();
    const result = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      return;
    }

    const payload = await register(name, email, password, confirmPassword);
    if (payload._errors) {
      setErrors(payload);
    }

    onRegisterComplete();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 bg-container-color rounded"
    >
      <InputField
        type="text"
        label="Name"
        id="name"
        placeholder="Enter your name"
        value={name}
        setValue={setName}
        errorMessage={errors?.name?._errors[0] || ""}
      />
      <InputField
        type="text"
        label="Email"
        id="email"
        placeholder="Enter your email"
        value={email}
        setValue={setEmail}
        errorMessage={errors?.email?._errors[0] || ""}
      />
      <InputField
        type="password"
        label="Password"
        id="password"
        placeholder="Enter your password"
        value={password}
        setValue={setPassword}
        errorMessage={errors?.password?._errors[0] || ""}
      />
      <InputField
        type="password"
        label="Confirm Password"
        id="confirmPassword"
        placeholder="Enter your password again"
        value={confirmPassword}
        setValue={setConfirmPassword}
        errorMessage={errors?.confirmPassword?._errors[0] || ""}
      />
      <div className="mt-4">
        <ButtonPrimary type="submit">Sign up</ButtonPrimary>
      </div>
    </form>
  );
};

export default RegisterForm;
