let complete = false;
const callbacks: (() => void)[] = [];

export function markIntroComplete() {
	complete = true;
	callbacks.forEach((fn) => fn());
	callbacks.length = 0;
}

export function onIntroComplete(fn: () => void) {
	if (complete) fn();
	else callbacks.push(fn);
}
