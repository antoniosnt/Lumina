"use server";

// Utils.
import { axiosInstance, formatPayloadEntries } from "@/lib/utils";

const onSubmit = async (formData: FormData) => {
	try {
		const payload = formatPayloadEntries(formData);
		console.log("[DEBUG] ACTION, ", payload);

		const response = await axiosInstance("/healthy").get();
		console.log("[DEBUG] RESPONSE, ", response.data);
	} catch (e) {
		console.error("[ERROR] ERROR, ", e);
	}
};

export default onSubmit;
