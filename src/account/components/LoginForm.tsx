import { FC, FormEvent, useEffect, useState } from "react";
import InputField from "../../components/InputField";
import ButtonPrimary from "../../components/ButtonPrimary";
import { ZodFormattedError } from "zod";
import useUser from "../hooks/useUser";

type FormData = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onLoginComplete: () => void;
};

const LoginForm: FC<LoginFormProps> = ({ onLoginComplete }) => {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ZodFormattedError<FormData> | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in your user details");
      return;
    }

    const payload = await login(email, password);
    if (payload._errors) {
      setErrors(payload);
    } else if (payload.error) {
      setErrorMessage(payload.error);
    }

    onLoginComplete();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 max-w-sm mx-auto p-4 bg-container-color rounded"
      id="login-form"
    >
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
      <label htmlFor="login-form" className="text-red-500">
        {errorMessage}
      </label>
      <ButtonPrimary type="submit">Log in</ButtonPrimary>
    </form>
  );
};

export default LoginForm;
