<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { user } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		await getAllProfiles();
	});
	const getAllProfiles = async () => {
		try {
			let { data, error } = await supabase.from('profiles').select('*');
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
</script>
<h1 class="px-3 text-lg">Welcome to SvelteKit + Supabase Scaffold</h1>
