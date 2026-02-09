export function initPageTransition(introSplashId: string, mainContentId: string) {
	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const introSplash = document.getElementById(introSplashId);
	const mainContent = document.getElementById(mainContentId);

	if (introSplash && mainContent) {
		if (prefersReducedMotion) {
			introSplash.remove();
			mainContent.style.visibility = "visible";
			mainContent.style.opacity = "1";
		} else {
			setTimeout(() => {
				mainContent.style.visibility = "visible";
				mainContent.style.opacity = "1";

				const originX = window.innerWidth / 2;
				const originY = window.innerHeight / 2;

				if ((window as any).initPortalBurn) {
					(window as any).initPortalBurn(originX, originY, () => introSplash.remove());
				} else {
					introSplash.remove();
				}
			}, 200);
		}
	}
}
