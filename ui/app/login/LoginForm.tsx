"use client";

import { Input } from "@/ui-kit/inputs/Input";
import { SpinnerSM } from "@/ui-kit/loaders";
import { useToasts } from "@/ui-kit/toasts";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

type FormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, isSubmitting },
  } = useForm<FormData>();

  const { displayErrorToast } = useToasts();

  const logIn = async ({ email, password }: FormData) => {
    try {
      const loginResponse = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        const errorDetails = await loginResponse.json();
        return displayErrorToast(errorDetails.detail);
      }

      return push("profile");
    } catch (error: any) {
      return displayErrorToast(error.message);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(logIn)}>
      <div className={styles.inputBlock}>
        <Input
          type="text"
          label="Email"
          id="Email"
          required
          {...register("email", {
            required: true,
          })}
        />
      </div>
      <div className={styles.inputBlock}>
        <Input
          type="password"
          label="Password"
          id="Password"
          required
          {...register("password", {
            required: true,
          })}
        />
      </div>
      <div className={styles.actions}>
        <button
          type="submit"
          className="button button-accent"
          disabled={isSubmitting}
        >
          {isSubmitting ? <SpinnerSM /> : "Log in"}
        </button>
      </div>
    </form>
  );
}
