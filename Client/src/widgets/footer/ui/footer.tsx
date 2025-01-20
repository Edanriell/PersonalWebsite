import { type FC } from "react";

import { SocialLinks } from "@widgets/social-links/ui";

export const Footer: FC = () => {
	return (
		<footer className="absolute z-20 w-[auto] h-[auto] bottom-[80px] right-[126px]">
			<SocialLinks />
		</footer>
	);
};
