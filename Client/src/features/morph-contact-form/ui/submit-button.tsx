import { type FC } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Spinner } from "@shared/ui/spinner";

type ContactFormSubmitButtonProps = {
	contactFormState: "idle" | "loading" | "success" | "failure";
};

export const ContactFormSubmitButton: FC<ContactFormSubmitButtonProps> = ({ contactFormState }) => (
	<motion.button
		initial={{ opacity: 0, x: -10 }}
		animate={{ opacity: 1, x: 0 }}
		transition={{ delay: 0.65, type: "spring", duration: 0.4, bounce: 0 }}
		type="submit"
		className="bg-button-gradient ml-auto flex items-center justify-center rounded-[6rem] font-bold text-[12rem] h-[24rem] w-[104rem] overflow-hidden shadow-lg relative"
	>
		<AnimatePresence mode="popLayout" initial={false}>
			<motion.span
				transition={{
					type: "spring",
					duration: 0.3,
					bounce: 0
				}}
				initial={{ opacity: 0, y: -25 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 25 }}
				key={contactFormState}
			>
				{contactFormState === "loading" ? (
					<Spinner size={14} color="rgba(255, 255, 255, 0.65)" />
				) : (
					<span className="drop-shadow-lg flex w-full justify-center items-start text-[white]">
						Send message
					</span>
				)}
			</motion.span>
		</AnimatePresence>
	</motion.button>
);
