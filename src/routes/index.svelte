<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params, url, fetch, session, context }) {
		const { data, error } = await supabase.from('profiles').select('*').limit(1).single();

		if (!error) {
			return {
				props: {
					profile: data
				}
			};
		}
		return {};
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { user } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import CircularLoadingIndicator from '$lib/components/CircularLoadingIndicator.svelte';

	export let profile;

	const logOut = async () => {
		let { error } = await supabase.auth.signOut();
		goto('/welcome');
	};
</script>

<section>
	<h1 class="px-3 py-10 text-center text-2xl text-slate-700">
		Welcome to SvelteKit + Supabase Scaffold
	</h1>
	<div id="profile" class="mx-auto max-w-xl rounded-md border bg-white p-4">
		<a on:click|preventDefault={logOut}>Logout</a>
		{#if profile}
		<h2>Welcome back {profile.first_name}!</h2>
		{:else}
		<CircularLoadingIndicator />
		{/if}
	</div>
</section>
