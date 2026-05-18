"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

// Components.
import { Button, Input, Label } from "@/components/ui";

// Lucide.
import { LogIn, UserPlus, Loader2 } from "lucide-react";

// Styles
import "@/components/AppForm/styles.css";

type AppFormProps = {
  onSubmit: (
    prevState: { error: string } | null,
    formData: FormData,
  ) => Promise<{ error: string } | null>;
  type: "login" | "signUp";
};

function SubmitButton({ type }: { type: "login" | "signUp" }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : type === "login" ? (
        <LogIn />
      ) : (
        <UserPlus />
      )}
      {pending ? "Loading..." : type === "login" ? "Login" : "Sign Up"}
    </Button>
  );
}

const AppForm = ({ onSubmit, type = "login" }: AppFormProps) => {
  const [state, formAction] = useActionState(onSubmit, null);

  const loginForm = () => {
    return (
      <div className="AppForm__Div">
        <section className="AppForm__Container">
          <Image src="/favicon.ico" alt="Logo" width={80} height={80} />
        </section>
        <section className="AppForm__Container">
          <div className="AppForm__Container--Label">
            <Label htmlFor="email-input">Email</Label>
            <Input
              id="email-input"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="AppForm__Container--Label">
            <Label htmlFor="password-input">Password</Label>
            <Input
              id="password-input"
              name="password"
              type="password"
              placeholder="Password"
              required
              minLength={8}
            />
          </div>
        </section>
        {state?.error && (
          <p className="AppForm__Error">{state.error}</p>
        )}
        <div className="AppForm__Container--Buttons">
          <SubmitButton type="login" />
          <span>
            {"Don't have an account?"}{" "}
            <Link href="/auth/sign-up" className="AppForm__Container--Link">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    );
  };

  const registerForm = () => {
    return (
      <div className="AppForm__Div">
        <section className="AppForm__Container">
          <Image src="/favicon.ico" alt="Logo" width={80} height={80} />
        </section>
        <section className="AppForm__Container">
          <div className="AppForm__Container--Label">
            <Label htmlFor="username-input">Username</Label>
            <Input
              id="username-input"
              name="username"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="AppForm__Container--Label">
            <Label htmlFor="email-input">Email</Label>
            <Input
              id="email-input"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="AppForm__Container--Row">
            <div className="AppForm__Container--Label">
              <Label htmlFor="first-name-input">First Name</Label>
              <Input
                id="first-name-input"
                name="first_name"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="AppForm__Container--Label">
              <Label htmlFor="last-name-input">Last Name</Label>
              <Input
                id="last-name-input"
                name="last_name"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="AppForm__Container--Label">
            <Label htmlFor="password-input">Password</Label>
            <Input
              id="password-input"
              name="password"
              type="password"
              placeholder="Password"
              required
              minLength={8}
            />
          </div>
          <div className="AppForm__Container--Label">
            <Label htmlFor="password-confirm-input">Confirm Password</Label>
            <Input
              id="password-confirm-input"
              name="password_confirm"
              type="password"
              placeholder="Confirm Password"
              required
              minLength={8}
            />
          </div>
        </section>
        {state?.error && (
          <p className="AppForm__Error">{state.error}</p>
        )}
        <div className="AppForm__Container--Buttons">
          <SubmitButton type="signUp" />
          <span>
            {"Already have an account?"}{" "}
            <Link href="/auth/login" className="AppForm__Container--Link">
              Login
            </Link>
          </span>
        </div>
      </div>
    );
  };

  return (
    <form className="AppForm" action={formAction}>
      {{ signUp: registerForm(), login: loginForm() }[type]}
    </form>
  );
};

export default AppForm;
