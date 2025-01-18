"use client";

import React, { type FC, type ReactNode, useEffect, useRef, useState } from "react";
import * as Three from "three";

import Clouds from "vanta/dist/vanta.clouds.min";

type CloudsBackgroundProps = {
	children: ReactNode;
};

type CloudsEffect = {
	destroy: () => void;
};

export const CloudsBackground: FC<CloudsBackgroundProps> = ({ children }) => {
	const [cloudsEffect, setCloudsEffect] = useState<CloudsEffect | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!cloudsEffect) {
			setCloudsEffect(
				Clouds({
					el: containerRef.current,
					THREE: Three
				})
			);
		}
		return () => {
			if (cloudsEffect) cloudsEffect.destroy();
		};
	}, [cloudsEffect]);

	return (
		<div ref={containerRef} className="w-full h-[100vh]">
			{children}
		</div>
	);
};
