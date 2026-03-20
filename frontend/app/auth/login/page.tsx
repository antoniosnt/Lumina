"use client";

import Image from "next/image";
import Link from "next/link";

// Components.
import { Button, Input, Label } from "@/components/ui";

// Lucide.
import { LogIn } from "lucide-react";

// Actions.
import onSubmit from "@/app/auth/login/action";

type HomeProps = {
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
};

export default function Home({
  emailPlaceholder = "example@domain.com",
  passwordPlaceholder = "********",
}: HomeProps) {
  return (
    <main className="AppMain">
      <form className="AppForm" action={onSubmit}>
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
                type="text"
                placeholder={emailPlaceholder}
              />
            </div>
            <div className="AppForm__Container--Label">
              <Label htmlFor="password-input">Password</Label>
              <Input
                id="password-input"
                name="password"
                type="password"
                placeholder={passwordPlaceholder}
              />
            </div>
          </section>
          <div className="AppForm__Container--Buttons">
            <Button type="submit">
              <LogIn />
              Login
            </Button>
            <span>
              {"Don't have a account?"}{" "}
              <Link href="/auth/sign-up" className="AppForm__Container--SignUp">
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </form>
    </main>
  );
}
