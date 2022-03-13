<script lang="ts">
	export let text: string = 'A button link';
	export let href: string = '/';
</script>

<a
	{href}
	class="mx-1 flex-1 rounded-lg border border-teal-500 bg-teal-500 px-3 py-2 text-teal-50 transition ease-in-out hover:border-teal-600 hover:bg-teal-600"
	>{text}</a>
