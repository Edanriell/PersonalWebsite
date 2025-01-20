"use client";

import { AnimatePresence, motion } from "motion/react";
import { type FC, type ReactNode, type RefObject, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { Spinner } from "../spinner";

type ButtonProps = {
	children: ReactNode;
};

export const Button: FC<ButtonProps> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
	const [feedback, setFeedback] = useState<string | "">("");

	const ref = useRef<HTMLDivElement | null>(null);

	useOnClickOutside(ref as RefObject<HTMLElement>, () => setOpen(false));

	function submit() {
		setFormState("loading");
		setTimeout(() => {
			setFormState("success");
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
							{formState === "success" ? (
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
										viewBox="0 0 32 32"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
											fill="#2090FF"
											fillOpacity="0.16"
										/>
										<path
											d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
											stroke="#2090FF"
											strokeWidth="2.4"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<h3 className="mb-[4rem] mt-[8rem] text-[14rem] font-medium text-[#21201c]">
										Message received !
									</h3>
									<p className="text-[14rem] text-[#63635d]">
										Thank you for reaching out !
									</p>
								</motion.div>
							) : (
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
