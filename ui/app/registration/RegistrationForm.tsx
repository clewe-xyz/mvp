"use client";

import { Input } from "@/ui-kit/inputs/Input";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

type FormData = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export function RegistrationForm() {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const registration = ({ email, nickname, password }: FormData) => {
    console.log("Accoutn creation", email, nickname, password);
  };
  const pwd = watch("password");

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