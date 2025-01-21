import { type CSSProperties, type FC } from "react";

import styles from "./spinner.module.css";

const bars = Array(12).fill(0);

type SpinnerProps = {
	color?: string;
	size?: number;
};

type SpinnerStyle = {
	"--spinner-size"?: string;
	"--spinner-color"?: string;
} & CSSProperties;

export const Spinner: FC<SpinnerProps> = ({ color = "", size = 20 }) => {
	return (
		<div
			className={styles["spinner__wrapper"]}
			style={
				{
					["--spinner-size"]: `${size}px`,
					["--spinner-color"]: color
				} as SpinnerStyle
			}
		>
			<div className={styles["spinner"]}>
				{bars.map((_, i) => (
					<div className={styles["spinner__bar"]} key={`spinner-bar-${i}`} />
				))}
			</div>
		</div>
	);
};
