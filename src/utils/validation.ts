import { z } from "zod";

export function getRegisterSchema() {
  return z
    .object({
      name: z.string().nonempty(),
      email: z.string().email(),
      password: z.string().min(8).max(20),
      confirmPassword: z.string().min(8).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
}

export function getLoginSchema() {
  return z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
  });
}
