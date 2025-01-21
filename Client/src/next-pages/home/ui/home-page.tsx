import { type FC } from "react";

import { MorphContactForm } from "@features/morph-contact-form/ui";

import { MorphTitle } from "@widgets/morph-title/ui";

import { Button } from "@shared/ui/button";

export const HomePage: FC = () => {
	return (
		<main className="relative">
			<section className="flex flex-col items-center justify-center min-h-[100vh] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-8%]">
				<MorphTitle to="Lauris">Edanriell</MorphTitle>
				<MorphContactForm Trigger={Button} />
			</section>
		</main>
	);
};
