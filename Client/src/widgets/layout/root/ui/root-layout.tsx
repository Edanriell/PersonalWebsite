import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";
import "@app/_styles/styles.css";

import { FC, ReactNode } from "react";
import { Metadata } from "next";

import { generateStaticMetadata } from "@shared/lib/functions";
import { Roboto } from "next/font/google";

type MainLayoutProps = {
	children: ReactNode;
};

const roboto = Roboto({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	variable: "--font-roboto",
	preload: true,
	fallback: ["system-ui", "Helvetica", "Arial", "sans-serif"],
	display: "swap"
});

export const metadata: Metadata = generateStaticMetadata({
	title: "Lauris - Front-End Engineer and Tech Enthusiast",
	description:
		"I'm Lauris, a Front-End Engineer specializing in React (Next.js) and Vue 3 (Nuxt). Passionate about building scalable, visually appealing applications.",
	ogTitle: "Lauris - Front-End Engineer and Tech Enthusiast",
	ogDescription:
		"Explore my projects and contributions in the world of front-end development, focusing on React and Vue technologies."
});

export const RootLayout: FC<MainLayoutProps> = ({ children }) => {
	return (
		<html lang="en" className={roboto.variable}>
			<body>{children}</body>
		</html>
	);
};
