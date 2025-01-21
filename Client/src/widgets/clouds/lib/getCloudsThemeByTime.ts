export const getCloudsThemeByTime = (hour: number) => {
	if (hour >= 6 && hour < 12) {
		return {
			skyColor: "#A6C8E2",
			cloudColor: "#C4D9F2",
			cloudShadowColor: "#A2B6C7",
			sunColor: "#FFCC00",
			sunGlareColor: "#FFDD55",
			sunlightColor: "#FFF4A5"
		};
	} else if (hour >= 12 && hour < 18) {
		return {
			skyColor: "#6FBCE7",
			cloudColor: "#C7DCEF",
			cloudShadowColor: "#8FAABF",
			sunColor: "#FFD700",
			sunGlareColor: "#FFA500",
			sunlightColor: "#FFF8DC"
		};
	} else if (hour >= 18 && hour < 21) {
		return {
			skyColor: "#7E9CA9",
			cloudColor: "#F1E1DC",
			cloudShadowColor: "#8B5E3C",
			sunColor: "#FF8C00",
			sunGlareColor: "#FFB84D",
			sunlightColor: "#FFD700"
		};
	} else {
		return {
			skyColor: "#0A0C1C",
			cloudColor: "#192540",
			cloudShadowColor: "#183550",
			sunColor: "#c0c0c0",
			sunGlareColor: "#a8a8a8",
			sunlightColor: "#e6e6e6"
		};
	}
};
