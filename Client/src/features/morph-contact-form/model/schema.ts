import * as yup from "yup";

export const contactFormSchema = yup
	.object({
		name: yup.string().required(),
		email: yup.string().email().required(),
		message: yup.string().min(12).max(148).required()
	})
	.required();
