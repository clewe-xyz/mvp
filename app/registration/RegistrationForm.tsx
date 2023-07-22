"use client";

import { Input } from "@/ui-kit/inputs/Input";
import { SpinnerSM } from "@/ui-kit/loaders";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { unauthorizedRequest } from "../api/unauthorizedRequest";
import styles from "./styles.module.css";
import { useToasts } from "@/ui-kit/toasts";

type FormData = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

const PASSWORD_MIN_LENGTH = 9;

export function RegistrationForm() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<FormData>();
  let demoUser = undefined;
  if (typeof sessionStorage !== "undefined") {
    demoUser = sessionStorage.getItem("demo_user");
  }
  const serializedDemoUser = demoUser ? JSON.parse(demoUser) : null;
  const pwd = watch("password");

  const { displayErrorToast } = useToasts();

  const registration = async ({ passwordConfirmation, ...creds }: FormData) => {
    try {
      const signupResponse = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({ id: serializedDemoUser?.id, ...creds }),
      });

      if (!signupResponse.ok) {
        const errorDetails = await signupResponse.json();
        return displayErrorToast(errorDetails.detail);
      }

      if (serializedDemoUser) {
        const { questId, accumExp, accumSkills } = serializedDemoUser;
        await unauthorizedRequest(`/api/quests/${questId}/complete`, {
          method: "POST",
          body: JSON.stringify({
            experience: accumExp,
            skills: accumSkills.map((id: string) => ({ id })),
          }),
        });
        sessionStorage.removeItem("demo_user");
      }

      return push("profile");
    } catch (error: any) {
      return displayErrorToast(error.message);
    }
  };

  return (
    <form
      className={styles.registrationForm}
      onSubmit={handleSubmit(registration)}
    >
      <div className={styles.inputBlock}>
        <Input
          type="text"
          label="Nickname"
          id="Nickname"
          defaultValue={serializedDemoUser?.nickname ?? undefined}
          required
          {...register("nickname", {
            required: true,
          })}
        />
      </div>
      <div className={styles.inputBlock}>
        <Input
          type="email"
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
          error={
            errors.password && errors.password.type === "minLength"
              ? "Password must containt al least 9 characters"
              : errors.password?.message
          }
          {...register("password", {
            required: true,
            minLength: PASSWORD_MIN_LENGTH,
          })}
        />
      </div>
      <div className={styles.inputBlock}>
        <Input
          type="password"
          label="Confirm password"
          id="confirm-password"
          required
          error={
            errors.passwordConfirmation &&
            errors.passwordConfirmation.type === "minLength"
              ? "Password must containt al least 9 characters"
              : errors.passwordConfirmation?.message
          }
          {...register("passwordConfirmation", {
            required: true,
            minLength: PASSWORD_MIN_LENGTH,
            validate: (passwordConfirmation) => {
              if (pwd !== passwordConfirmation) {
                return "Password doesn't match";
              }
              return true;
            },
          })}
        />
      </div>
      <div className={styles.actions}>
        <button
          type="submit"
          className="button button-accent"
          disabled={isSubmitting}
        >
          {isSubmitting ? <SpinnerSM /> : "Create account"}
        </button>
      </div>
    </form>
  );
}
