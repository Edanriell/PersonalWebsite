import { type FC } from "react";

import { Icon } from "@shared/ui/icon";

export const SocialLinks: FC = () => {
	return (
		<ul className="flex flex-row items-center gap-x-[20rem]">
			<li className="relative w-[52rem] h-[52rem]">
				<span className="visually-hidden">Link to Edanriell's GitHub profile</span>
				<a href="https://github.com/edanriell">
					<Icon type="gitHub" />
				</a>
			</li>
			<li className="relative w-[52rem] h-[52rem]">
				<span className="visually-hidden">Link to Edanriell's X profile</span>
				<a href="https://x.com/Edanriell">
					<Icon type="x" />
				</a>
			</li>
		</ul>
	);
};
