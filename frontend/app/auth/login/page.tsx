"use client";

// Components
import AppForm from "@/components/AppForm";

// Action
import onSubmit from "@/app/auth/login/action";

export default function Login() {
  return (
    <main className="AppMain">
      {
        <AppForm
          emailPlaceholder="Email"
          passwordPlaceholder="Password"
          onSubmit={onSubmit}
          type="login"
        />
      }
    </main>
  );
}
