import { type FC } from "react";
import { motion } from "motion/react";

export const SuccessSection: FC = () => (
	<motion.section
		key="success"
		initial={{ y: -32, opacity: 0, filter: "blur(4rem)" }}
		animate={{ y: 0, opacity: 1, filter: "blur(0rem)" }}
		transition={{ type: "spring", duration: 0.4, bounce: 0 }}
		className="flex h-full flex-col items-center justify-center"
	>
		<svg
			className="mt-[-4rem]"
			width="32"
			height="32"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
		>
			<path
				fillOpacity="0.16"
				fill="#2090FF"
				d="M48 256a208 208 0 1 0 416 0A208 208 0 1 0 48 256zm95-17c9.4-9.4 24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9z"
			/>
			<path
				fill="#2090FF"
				d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
			/>
		</svg>
		<h2 className="mb-[4rem] mt-[8rem] text-[14rem] font-medium text-[#21201c]">
			Message received !
		</h2>
		<p className="text-[14rem] text-[#63635d]">Thank you for reaching out !</p>
	</motion.section>
);
