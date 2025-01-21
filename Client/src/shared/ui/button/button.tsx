"use client";

import { type ComponentPropsWithoutRef, type FC, type ReactNode } from "react";
import { motion, type MotionProps } from "motion/react";

type ButtonProps = {
	children: ReactNode;
} & MotionProps &
	ComponentPropsWithoutRef<"button">;

export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
	return (
		<motion.button
			className="relative flex h-[36rem] items-center rounded-[8rem] border-[1rem] border-solid border-[#e9e9e7] py-0 px-[12rem] font-medium outline-none shadow-lg bg-slate-50"
			style={{ borderRadius: 8 }}
			{...rest}
		>
			{children}
		</motion.button>
	);
};
