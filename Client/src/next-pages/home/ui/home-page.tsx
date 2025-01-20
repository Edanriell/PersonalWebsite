import { type FC } from "react";

import { Button } from "@shared/ui/button";

export const HomePage: FC = () => {
	return (
		<main className="relative">
			<section className="flex flex-col items-center justify-center min-h-[100vh] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-8%]">
				<h1 className="font-bold text-[52rem] md:text-[56rem] text-white drop-shadow-lg">
					Edanriell
					<span className="sr-only">Front-End Engineer and Tech Enthusiast</span>
				</h1>
				<Button>Send message</Button>
			</section>
		</main>
	);
};
