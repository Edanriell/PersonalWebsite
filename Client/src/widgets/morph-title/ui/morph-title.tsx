"use client";

import { type ComponentPropsWithoutRef, type FC, useState } from "react";
import { AnimatePresence, motion, type MotionProps } from "motion/react";

type MorphTitleProps = {
	to: string;
	children: string;
} & MotionProps &
	ComponentPropsWithoutRef<"h1">;

export const MorphTitle: FC<MorphTitleProps> = ({ to, children, ...rest }) => {
	const [title, setTitle] = useState<string>(children);

	const generateKeys = (text: string) => {
		const charCount: { [key: string]: number } = {};

		return text.split("").map((char) => {
			if (!charCount[char]) {
				charCount[char] = 0;
			}

			const key = `${char}-${charCount[char]}`;
			charCount[char]++;

			return { char, key };
		});
	};

	const textToDisplay = generateKeys(title);

	return (
		<AnimatePresence mode="popLayout" initial={false}>
			<motion.h1
				onMouseEnter={() => setTitle(to)}
				onMouseLeave={() => setTitle(children)}
				onTap={() => setTitle(title === to ? children : to)}
				className="font-bold text-[52rem] md:text-[56rem] drop-shadow-lg text-slate-50 flex flex-row"
				{...rest}
			>
				{textToDisplay.map(({ char, key }, index) => (
					<motion.span
						key={key}
						layoutId={key}
						className="pointer-events-none"
						initial={{ y: index % 2 === 0 ? 20 : -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: index % 2 === 0 ? -20 : 20, opacity: 0 }}
						transition={{
							duration: 0.55,
							type: "spring",
							bounce: 0
						}}
					>
						{char === " " ? "\u00A0" : char}
					</motion.span>
				))}
				<span className="sr-only">Front-End Engineer and Tech Enthusiast</span>
			</motion.h1>
		</AnimatePresence>
	);
};
