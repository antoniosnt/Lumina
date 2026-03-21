"use server";

import { cookies } from "next/headers";
import { axiosInstance } from "@/lib/utils";

const onSubmit = async (formData: FormData) => {
	try {
		const payload = {
			username: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		const response = await axiosInstance("/api/auth/login/").post(payload);
		const { access, refresh } = response.data as {
			access: string;
			refresh: string;
		};

		const cookieStore = await cookies();
		const secure = process.env.NODE_ENV === "production";
		cookieStore.set("access_token", access, { httpOnly: true, secure });
		cookieStore.set("refresh_token", refresh, { httpOnly: true, secure });
	} catch (e) {
		console.error(e);
	}
};

export default onSubmit;
