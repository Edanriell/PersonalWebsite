"use client";

import { type ElementType, type FC, type RefObject, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";

import { Spinner } from "@shared/ui/spinner";

type MorphContactForm = {
	Trigger: ElementType;
};

export const MorphContactForm: FC<MorphContactForm> = ({ Trigger }) => {
	const [openContactForm, setOpenContactForm] = useState<boolean>(false);
	const [contactFormState, setContactFormState] = useState<
		"idle" | "loading" | "success" | "failure"
	>("idle");
	const [feedback, setFeedback] = useState<string | "">("");

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
				handleContactFormSubmit();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [openContactForm, contactFormState]);

	const handleContactFormSubmit = () => {
		setContactFormState("loading");

		setTimeout(() => {
			setContactFormState("failure");
		}, 1500);

		setTimeout(() => {
			setOpenContactForm(false);
		}, 3300);
	};

	const renderSuccessSection = () => (
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

	const renderFailureSection = () => (
		<motion.div
			key="failure"
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
					fill="#FF3D00"
					d="M48 256a208 208 0 1 0 416 0A208 208 0 1 0 48 256zm240 96a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM232 152c0-13.3 10.7-24 24-24s24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112z"
				/>
				<path
					fill="#FF3D00"
					d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
				/>
			</svg>
			<h3 className="mb-[4rem] mt-[8rem] text-[14rem] font-medium text-[#21201c]">
				I&#39;m Sorry!
			</h3>
			<p className="text-[14rem] text-[#63635d] text-center">
				Looks like something didn’t go as planned.
			</p>
			<p className="text-[14rem] text-[#63635d] text-center">Please try again in a moment.</p>
		</motion.div>
	);

	const renderContactFormSubmitButton = () => (
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

	const renderContactForm = () => (
		<motion.form
			exit={{ y: 8, opacity: 0, filter: "blur(4rem)" }}
			transition={{ type: "spring", duration: 0.4, bounce: 0 }}
			key="form"
			onSubmit={(e) => {
				e.preventDefault();
				if (!feedback) return;
				handleContactFormSubmit();
			}}
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
				<input
					id="name"
					name="name"
					className="mb-[5rem] border-[1rem] border-solid border-[#e6e7e8] bg-[white] w-full h-[42rem] rounded-[8rem] p-[12rem] text-[14rem] outline-none"
					type="text"
					placeholder="Name"
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
				<input
					id="email"
					name="email"
					className="mb-[5rem] border-[1rem] border-solid border-[#e6e7e8] bg-[white] w-full h-[42rem] rounded-[8rem] p-[12rem] text-[14rem] outline-none"
					type="email"
					placeholder="Email"
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
				<textarea
					id="message"
					name="message"
					placeholder="Message"
					onChange={(e) => setFeedback(e.target.value)}
					className="border-[1rem] border-solid border-[#e6e7e8] bg-[white] w-full h-[126rem] resize-none rounded-[8rem] p-[12rem] text-[14rem] outline-none"
					required
				/>
			</motion.div>
			<div className="absolute bottom-[12rem] right-[12rem]">
				{renderContactFormSubmitButton()}
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
					setFeedback("");
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
							{contactFormState === "success" && renderSuccessSection()}
							{contactFormState === "failure" && renderFailureSection()}
							{(contactFormState === "idle" || contactFormState === "loading") &&
								renderContactForm()}
						</AnimatePresence>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
};
