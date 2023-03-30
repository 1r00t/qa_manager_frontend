<script lang="ts">
	let className: string = "";
	export { className as class };
	export let size: number = 24;
	export let stroke: number = 2;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	stroke-width={stroke}
	stroke="currentColor"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<path stroke="none" d="M0 0h24v24H0z" fill="none" />
	<path d="M6 9l6 6l6 -6" />
</svg>
