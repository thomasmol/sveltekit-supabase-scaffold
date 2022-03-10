/** Dispatch event on click outside of node */
// Taken from: https://svelte.dev/repl/0ace7a508bd843b798ae599940a91783?version=3.16.7

export default function clickOutside(node): { destroy(): void; } {
	const handleClick = (event: { target: any; defaultPrevented: any }) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickoutside', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy(): void {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
