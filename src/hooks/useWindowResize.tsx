import { useEffect, useState } from "react";

export function useWindowResize() {
	const [isLarge, setIsLarge] = useState<boolean>(false);
	const [isMedium, setIsMedium] = useState<boolean>(false);
	const [isSmall, setIsSmall] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	useEffect(() => {
		const handleResize = () => {
			setIsLarge(window.matchMedia("(min-width: 900px)").matches);
			setIsMedium(window.matchMedia("(max-width: 899px)").matches);
			setIsSmall(window.matchMedia("(max-width: 599px)").matches);
			setIsMobile(window.matchMedia("(max-width: 414px)").matches);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return { isLarge, isMedium, isSmall, isMobile };
}
