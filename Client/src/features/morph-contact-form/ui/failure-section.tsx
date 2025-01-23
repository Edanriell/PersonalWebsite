import { type FC } from "react";
import { motion } from "motion/react";

export const FailureSection: FC = () => (
	<motion.div
		key="failure"
		initial={{ y: -32, opacity: 0, filter: "blur(4rem)" }}
		animate={{ y: 0, opacity: 1, filter: "blur(0rem)" }}
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
				fill="#FF3D00"
				d="M48 256a208 208 0 1 0 416 0A208 208 0 1 0 48 256zm240 96a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM232 152c0-13.3 10.7-24 24-24s24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112z"
			/>
			<path
				fill="#FF3D00"
				d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
			/>
		</svg>
		<h3 className="mb-[4rem] mt-[8rem] text-[14rem] font-medium text-[#21201c]">
			I&#39;m Sorry!
		</h3>
		<p className="text-[14rem] text-[#63635d] text-center">
			Looks like something didn’t go as planned.
		</p>
		<p className="text-[14rem] text-[#63635d] text-center">Please try again in a moment.</p>
	</motion.div>
);
