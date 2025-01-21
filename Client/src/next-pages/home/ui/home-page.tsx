import { type FC } from "react";

import { MorphContactForm } from "@features/morph-contact-form/ui";

import { Button } from "@shared/ui/button";

export const HomePage: FC = () => {
	return (
		<main className="relative">
			<section className="flex flex-col items-center justify-center min-h-[100vh] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-8%]">
				<h1 className="font-bold text-[52rem] md:text-[56rem] drop-shadow-lg text-slate-50">
					Edanriell
					<span className="sr-only">Front-End Engineer and Tech Enthusiast</span>
				</h1>
				<MorphContactForm Trigger={Button} />
			</section>
		</main>
	);
};
