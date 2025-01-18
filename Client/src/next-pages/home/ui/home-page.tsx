import { type FC } from "react";

export const HomePage: FC = () => {
	return (
		<main className="relative">
			<section className="flex flex-col items-center justify-center min-h-[100vh]">
				<h1 className="font-medium text-[42rem] text-amber-50">
					Edanriell
					<span className="sr-only">Front-End Engineer and Tech Enthusiast</span>
				</h1>
			</section>
		</main>
	);
};
