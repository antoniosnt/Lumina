"use client";

import AppForm from "@/components/AppForm";
import signUpAction from "@/app/auth/sign-up/action";

export default function SignUp() {
  return (
    <main className="AppMain">
      <AppForm onSubmit={signUpAction} type="signUp" />
    </main>
  );
}
