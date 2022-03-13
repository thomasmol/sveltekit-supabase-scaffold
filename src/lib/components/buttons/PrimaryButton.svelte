<script lang="ts">
	export let text: string = 'A button link';
	export let type: string = 'submit';
	export let disabled: boolean = false;
</script>

<button
	{type}
	{disabled}
	class="inline-flex items-center justify-center rounded bg-teal-500 py-2 px-3 text-white transition ease-in-out hover:bg-teal-600"
	><slot name="icon" />
	{text}</button>
