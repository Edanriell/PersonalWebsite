import * as yup from "yup";

export const contactFormSchema = yup
	.object({
		name: yup.string().required(),
		email: yup.string().email().required(),
		message: yup.string().min(24).max(256).required()
	})
	.required();
