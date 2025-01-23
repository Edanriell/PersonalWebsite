"use client";

import { type ElementType, type FC, type RefObject, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

	const inputAnimationVariants: Variants = {
		valid: { borderColor: "#e6e7e8", backgroundColor: "#ffffff" },
		invalid: { borderColor: "#f44336", backgroundColor: "#ffebee" }
	};

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
			<motion.div
				initial={{ opacity: 0, y: -5, scale: 0.8 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ delay: 0.25, type: "spring", duration: 0.4, bounce: 0 }}
			>
				<label className="visually-hidden" htmlFor="name">
					Your name
				</label>
				<motion.input
					variants={inputAnimationVariants}
					animate={errors.name ? "invalid" : "valid"}
					transition={{
						type: "spring",
						duration: 0.4,
						bounce: 0
					}}
					id="name"
					className="mb-[5rem] border-[1rem] border-solid w-full h-[42rem] rounded-[8rem] p-[12rem] text-[14rem] outline-none"
					type="text"
					placeholder="Name"
					{...register("name")}
				/>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: -5, scale: 0.8 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ delay: 0.3, type: "spring", duration: 0.4, bounce: 0 }}
			>
				<label className="visually-hidden" htmlFor="email">
					Your email address
				</label>
				<motion.input
					variants={inputAnimationVariants}
					animate={errors.email ? "invalid" : "valid"}
					transition={{
						type: "spring",
						duration: 0.4,
						bounce: 0
					}}
					id="email"
					className="mb-[5rem] border-[1rem] border-solid border-[#e6e7e8] bg-[white] w-full h-[42rem] rounded-[8rem] p-[12rem] text-[14rem] outline-none"
					type="email"
					placeholder="Email"
					{...register("email")}
				/>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: -5, scale: 0.8 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ delay: 0.35, type: "spring", duration: 0.4, bounce: 0 }}
			>
				<label className="visually-hidden" htmlFor="message">
					Your message
				</label>
				<motion.textarea
					variants={inputAnimationVariants}
					animate={errors.message ? "invalid" : "valid"}
					transition={{
						type: "spring",
						duration: 0.4,
						bounce: 0
					}}
					id="message"
					placeholder="Message"
					className="border-[1rem] border-solid border-[#e6e7e8] bg-[white] w-full h-[126rem] resize-none rounded-[8rem] p-[12rem] text-[14rem] outline-none"
					{...register("message")}
				/>
			</motion.div>
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
