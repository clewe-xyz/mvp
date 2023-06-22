"use client";

import { Input } from "@/ui-kit/inputs/Input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { unauthorizedRequest } from "../api/unauthorizedRequest";

type FormData = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export function RegistrationForm() {
  const { push } = useRouter();
  const { register, handleSubmit, watch } = useForm<FormData>();
  let demoUser = undefined;
  if (typeof sessionStorage !== "undefined") {
    demoUser = sessionStorage.getItem("demo_user");
  }
  const serializedDemoUser = demoUser ? JSON.parse(demoUser) : null;
  const pwd = watch("password");

  const registration = ({ passwordConfirmation, ...creds }: FormData) => {
    fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ id: serializedDemoUser?.id, ...creds }),
    })
      .then(() => {
        if (serializedDemoUser) {
          const { questId, accumExp, accumSkills } = serializedDemoUser;
          return unauthorizedRequest(`/api/quests/${questId}/complete`, {
            method: "POST",
            body: JSON.stringify({
              experience: accumExp,
              skills: accumSkills.map((skill: any) => ({ id: skill.id })),
            }),
          }).then(() => sessionStorage.removeItem("demo_user"));
        }
      })
      .then(() => push("profile"))
      .catch((error) => console.error(error));
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
          {...register("password", {
            required: true,
            minLength: 9,
          })}
        />
      </div>
      <div className={styles.inputBlock}>
        <Input
          type="password"
          label="Confirm password"
          id="confirm-password"
          required
          {...register("passwordConfirmation", {
            required: true,
            minLength: 9,
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
        <button type="submit" className="button button-accent">
          Create account
        </button>
      </div>
    </form>
  );
}
