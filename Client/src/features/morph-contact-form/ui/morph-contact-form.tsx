"use client";

import { type ElementType, type FC, type RefObject, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@shared/ui/input";

import { contactFormSchema } from "../model";

import { FailureSection } from "./failure-section";
import { SuccessSection } from "./success-section";
import { ContactFormSubmitButton } from "./submit-button";

type MorphContactForm = {
	Trigger: ElementType;
};

export const MorphContactForm: FC<MorphContactForm> = ({ Trigger }) => {
	const [openContactForm, setOpenContactForm] = useState<boolean>(false);
	const [contactFormState, setContactFormState] = useState<
		"idle" | "loading" | "success" | "failure"
	>("idle");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		resolver: yupResolver(contactFormSchema)
	});

	const contactFormContainerRef = useRef<HTMLDivElement | null>(null);

	useOnClickOutside(contactFormContainerRef as RefObject<HTMLElement>, () =>
		setOpenContactForm(false)
	);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpenContactForm(false);
			}

			if (
				(event.ctrlKey || event.metaKey) &&
				event.key === "Enter" &&
				openContactForm &&
				contactFormState === "idle"
			) {
				handleSubmit(handleContactFormSubmit)();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [openContactForm, contactFormState]);

	const handleContactFormSubmit = (data: unknown) => {
		console.log(data);

		setContactFormState("loading");

		setTimeout(() => {
			setContactFormState("failure");
			reset();
		}, 1500);

		setTimeout(() => {
			setOpenContactForm(false);
		}, 3300);
	};

	const renderContactForm = () => (
		<motion.form
			exit={{ y: 8, opacity: 0, filter: "blur(4rem)" }}
			transition={{ type: "spring", duration: 0.4, bounce: 0 }}
			key="form"
			onSubmit={handleSubmit(handleContactFormSubmit)}
			className="rounded-[8rem]"
		>
			<Input
				type="text"
				label="Your name"
				htmlFor="name"
				id="name"
				placeholder="Name"
				error={!!errors.name}
				{...register("name")}
			/>
			<Input
				type="email"
				label="Your email address"
				htmlFor="email"
				id="email"
				placeholder="Email"
				error={!!errors.email}
				{...register("email")}
			/>
			<Input
				type="textarea"
				label="Your message"
				htmlFor="message"
				id="message"
				placeholder="Message"
				error={!!errors.message}
				{...register("message")}
			/>
			<div className="absolute bottom-[12rem] right-[12rem]">
				<ContactFormSubmitButton contactFormState={contactFormState} />
			</div>
		</motion.form>
	);

	return (
		<div className="flex justify-center items-start">
			<Trigger
				layoutId="wrapper"
				onClick={() => {
					setOpenContactForm(true);
					setContactFormState("idle");
				}}
				key="button"
			>
				<motion.span className="block text-[14rem] drop-shadow-lg" layoutId="text">
					Send message
				</motion.span>
			</Trigger>
			<AnimatePresence>
				{openContactForm ? (
					<motion.div
						layoutId="wrapper"
						className="absolute h-[232rem] w-[364rem] overflow-hidden rounded-[12rem] bg-[#f5f6f7] p-[6rem] outline-none"
						ref={contactFormContainerRef}
						style={{ borderRadius: 12 }}
					>
						<motion.span
							className="absolute top-[7%] left-[37.4%] text-[14rem] drop-shadow-lg pointer-events-none"
							style={{ opacity: 0 }}
							layoutId="text"
						>
							Send message
						</motion.span>
						<AnimatePresence mode="popLayout">
							{contactFormState === "success" && <SuccessSection />}
							{contactFormState === "failure" && <FailureSection />}
							{(contactFormState === "idle" || contactFormState === "loading") &&
								renderContactForm()}
						</AnimatePresence>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
};
