"use client";

import { AnimatePresence, motion } from "motion/react";
import { type FC, type ReactNode, type RefObject, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { Spinner } from "@shared/ui/spinner";

type ButtonProps = {
	children: ReactNode;
};

export const Button: FC<ButtonProps> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<"idle" | "loading" | "success" | "failure">("idle");
	const [feedback, setFeedback] = useState<string | "">("");

	const ref = useRef<HTMLDivElement | null>(null);

	useOnClickOutside(ref as RefObject<HTMLElement>, () => setOpen(false));

	function submit() {
		setFormState("loading");

		setTimeout(() => {
			setFormState("failure");
		}, 1500);

		setTimeout(() => {
			setOpen(false);
		}, 3300);
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
			}

			if (
				(event.ctrlKey || event.metaKey) &&
				event.key === "Enter" &&
				open &&
				formState === "idle"
			) {
				submit();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [open, formState]);

	return (
		<div className="flex justify-center items-start">
			<motion.button
				layoutId="wrapper"
				onClick={() => {
					setOpen(true);
					setFormState("idle");
					setFeedback("");
				}}
				key="button"
				className="relative flex h-[36rem] items-center rounded-[8rem] border-[1rem] border-solid border-[#e9e9e7] bg-[white] py-0 px-[12rem] font-medium outline-none shadow-lg"
				style={{ borderRadius: 8 }}
			>
				<motion.span className="block text-[14rem] drop-shadow-lg" layout>
					{children}
				</motion.span>
			</motion.button>
			<AnimatePresence>
				{open ? (
					<motion.div
						layoutId="wrapper"
						className="absolute h-[232rem] w-[364rem] overflow-hidden rounded-[12rem] bg-[#f5f6f7] p-[6rem] outline-none"
						ref={ref}
						style={{ borderRadius: 12 }}
					>
						<AnimatePresence mode="popLayout">
							{formState === "success" && (
								<motion.div
									key="success"
									initial={{ y: -32, opacity: 0, filter: "blur(4px)" }}
									animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
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
									<h3 className="mb-[4rem] mt-[8rem] text-[14rem] font-medium text-[#21201c]">
										Message received !
									</h3>
									<p className="text-[14rem] text-[#63635d]">
										Thank you for reaching out !
									</p>
								</motion.div>
							)}
							{formState === "failure" && (
								<motion.div
									key="failure"
									initial={{ y: -32, opacity: 0, filter: "blur(4px)" }}
									animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
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
											d="M48 256a208 208 0 1 0 416 0A208 208 0 1 0 48 256zm240 96a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM232 152c0-13.3 10.7-24 24-24s24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112z"
										/>
										<path
											fill="#2090FF"
											d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
										/>
									</svg>
									<h3 className="mb-[4rem] mt-[8rem] text-[14rem] font-medium text-[#21201c]">
										I&#39;m Sorry!
									</h3>
									<p className="text-[14rem] text-[#63635d] text-center">
										Looks like something didn’t go as planned.
									</p>
									<p className="text-[14rem] text-[#63635d] text-center">
										Please try again in a moment.
									</p>
								</motion.div>
							)}
							{(formState === "idle" || formState === "loading") && (
								<motion.form
									exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
									transition={{ type: "spring", duration: 0.4, bounce: 0 }}
									key="form"
									onSubmit={(e) => {
										e.preventDefault();
										if (!feedback) return;
										submit();
									}}
									className="rounded-[8rem]"
								>
									<div>
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
									</div>
									<div>
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
									</div>
									<div>
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
									</div>
									<div className="absolute bottom-[12rem] right-[12rem]">
										<button
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
													key={formState}
												>
													{formState === "loading" ? (
														<Spinner
															size={14}
															color="rgba(255, 255, 255, 0.65)"
														/>
													) : (
														<span className="drop-shadow-lg flex w-full justify-center items-start text-[white]">
															Send message
														</span>
													)}
												</motion.span>
											</AnimatePresence>
										</button>
									</div>
								</motion.form>
							)}
						</AnimatePresence>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
};
