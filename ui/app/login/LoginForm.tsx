"use client";

import { Input } from "@/ui-kit/inputs/Input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

type FormData = {
  nickname: string;
  password: string;
};

export function LoginForm() {
  const { push } = useRouter();
  const { register, handleSubmit } = useForm<FormData>();
  const logIn = ({ nickname, password }: FormData) => {
    console.log("Log in user", nickname, password);
    push("profile");
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(logIn)}>
      <div className={styles.inputBlock}>
        <Input
          type="text"
          label="Nickname"
          id="Nickname"
          required
          {...register("nickname", {
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
        <button type="submit" className="button button-accent">
          Log in
        </button>
      </div>
    </form>
  );
}
