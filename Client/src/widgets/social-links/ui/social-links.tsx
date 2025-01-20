import { type FC } from "react";

import { Icon, type IconType } from "@shared/ui/icon";

const socialLinks = new Map([
	[
		"https://github.com/edanriell",
		{
			iconType: "gitHub",
			text: "Link to Edanriell's GitHub profile"
		}
	],
	[
		"https://x.com/Edanriell",
		{
			iconType: "x",
			text: "Link to Edanriell's X profile"
		}
	]
]);

export const SocialLinks: FC = () => {
	return (
		<ul className="flex flex-row items-center gap-x-[20rem]">
			{Array.from(socialLinks.entries()).map(([href, { iconType, text }]) => (
				<li key={href} className="relative w-[38rem] h-[38rem] md:w-[46rem] md:h-[46rem]">
					<span className="visually-hidden">{text}</span>
					<a href={href}>
						<Icon type={iconType as IconType} />
					</a>
				</li>
			))}
		</ul>
	);
};
