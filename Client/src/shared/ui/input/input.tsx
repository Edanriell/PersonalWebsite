import { type ComponentPropsWithoutRef, type FC } from "react";
import { motion, type MotionProps, type Variants } from "motion/react";

type InputProps = {
	type: "text" | "email" | "textarea";
	label: string;
	htmlFor: string;
	id: string;
	placeholder: string;
	error: boolean;
	rest?: unknown;
};

export const Input: FC<InputProps> = ({
	type,
	label,
	htmlFor,
	id,
	placeholder,
	error,
	...rest
}) => {
	const inputAnimationVariants: Variants = {
		valid: { borderColor: "#e6e7e8", backgroundColor: "#ffffff" },
		invalid: { borderColor: "#f44336", backgroundColor: "#ffebee" }
	};

	switch (type) {
		case "text":
			return (
				<div>
					<label className="visually-hidden" htmlFor={htmlFor}>
						{label}
					</label>
					<motion.input
						variants={inputAnimationVariants}
						animate={error ? "invalid" : "valid"}
						transition={{
							type: "spring",
							duration: 0.4,
							bounce: 0
						}}
						id={id}
						className="mb-[5rem] border-[1rem] border-solid border-[#e6e7e8] bg-[white] w-full h-[42rem] rounded-[8rem] p-[12rem] text-[14rem] outline-none"
						type="text"
						placeholder={placeholder}
						{...(rest as ComponentPropsWithoutRef<"input"> & MotionProps)}
					/>
				</div>
			);
		case "email":
			return (
				<div>
					<label className="visually-hidden" htmlFor={htmlFor}>
						{label}
					</label>
					<motion.input
						variants={inputAnimationVariants}
						animate={error ? "invalid" : "valid"}
						transition={{
							type: "spring",
							duration: 0.4,
							bounce: 0
						}}
						id={id}
						className="mb-[5rem] border-[1rem] border-solid border-[#e6e7e8] bg-[white] w-full h-[42rem] rounded-[8rem] p-[12rem] text-[14rem] outline-none"
						type="email"
						placeholder={placeholder}
						{...(rest as ComponentPropsWithoutRef<"input"> & MotionProps)}
					/>
				</div>
			);
		case "textarea":
			return (
				<div>
					<label className="visually-hidden" htmlFor={htmlFor}>
						{label}
					</label>
					<motion.textarea
						variants={inputAnimationVariants}
						animate={error ? "invalid" : "valid"}
						transition={{
							type: "spring",
							duration: 0.4,
							bounce: 0
						}}
						id={id}
						placeholder={placeholder}
						className="border-[1rem] border-solid border-[#e6e7e8] bg-[white] w-full h-[126rem] resize-none rounded-[8rem] p-[12rem] text-[14rem] outline-none"
						{...(rest as ComponentPropsWithoutRef<"textarea"> & MotionProps)}
					/>
				</div>
			);
		default:
			return null;
	}
};
