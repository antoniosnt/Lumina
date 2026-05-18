"use client";

import AppForm from "@/components/AppForm";
import loginAction from "@/app/auth/login/action";

export default function Login() {
  return (
    <main className="AppMain">
      <AppForm onSubmit={loginAction} type="login" />
    </main>
  );
}
