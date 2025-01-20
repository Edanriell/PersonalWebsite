"use client";

import { type FC, type ReactNode, useEffect, useRef, useState } from "react";
import * as Three from "three";

import Clouds from "vanta/dist/vanta.clouds.min";

import { getCloudsThemeByTime } from "../lib";

type CloudsBackgroundProps = {
	children: ReactNode;
};

type CloudsEffect = {
	destroy: () => void;
};

export const CloudsBackground: FC<CloudsBackgroundProps> = ({ children }) => {
	const [cloudsEffect, setCloudsEffect] = useState<CloudsEffect | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const hours = new Date().getHours();
	const theme = getCloudsThemeByTime(hours);

	useEffect(() => {
		if (!cloudsEffect) {
			setCloudsEffect(
				Clouds({
					el: containerRef.current,
					THREE: Three,
					...theme
				})
			);
		}

		return () => {
			if (cloudsEffect) cloudsEffect.destroy();
		};
	}, [theme]);

	return (
		<div ref={containerRef} className="w-full h-[100vh]">
			{children}
		</div>
	);
};
