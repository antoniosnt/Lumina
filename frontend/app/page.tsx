"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

// Components.
import { Button, Input, Label } from "@/components/ui";

// Lucide.
import { LogIn, UserPlus } from "lucide-react";

// Actions.
import onSubmit from "@/app/action";

type HomeProps = {
	emailPlaceholder?: string;
	passwordPlaceholder?: string;
};

/**
 * @author Antonio Santana G. Neto
 * @description SSH CONNECTION TESTING
 */
export default function Home({
	emailPlaceholder = "example@domain.com",
	passwordPlaceholder = "********",
}: HomeProps) {
	const router = useRouter();

	const onRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		router.push("/auth/sign-up");
	};

	return (
		<main className="AppMain">
			<form className="AppForm" action={onSubmit}>
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
						<Label htmlFor="password-input">Passowrd</Label>
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
					<span>{"Don't have an account?"}</span>
					<Button type="button" onClick={onRedirect}>
						<UserPlus />
						Sign Up
					</Button>
				</div>
			</form>
		</main>
	);
}
