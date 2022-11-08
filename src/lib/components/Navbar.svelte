<script lang="ts">
	import { goto } from '$app/navigation';
	import supabaseClient from '$lib/supabase';
	import { error, isLoading } from '@supabase/auth-helpers-svelte';
	import CircularLoadingIndicator from '$lib/components/svg/CircularLoadingIndicator.svelte';
	import EmptyProfilePicture from '$lib/components/svg/EmptyProfilePicture.svelte';
	import clickOutside from '$lib/clickOutside';
	import { session } from '$app/stores';

	let userMenuOpen = false;

	const logOut = async () => {
		let { error } = await supabaseClient.auth.signOut();
		goto('/welcome');
	};

	let profile = {};

	const fetchProfile = async () => {
		const { data, error } = await supabaseClient
			.from('profiles')
			.select('*')
			.eq('id', $session.user.id)
			.limit(1)
			.single();
		//if (error) throw error;
		profile = data;
	};

	$: {
		if ($session.user && $session.user.id) {
			fetchProfile();
		}
	}
</script>

<nav class="bg-slate-100 py-4 dark:bg-slate-800">
	<div class="container mx-auto flex justify-between px-4">
		<a
			href="/"
			class="text-lg font-medium text-slate-700 hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-200"
			>SvelteKit + Supabase Scaffold</a>
		<div class="relative" use:clickOutside on:clickoutside={() => (userMenuOpen = false)}>
			{#if !$session.user}
				{#if $error}
					<p>{$error.message}</p>
				{/if}
				<h1>{$isLoading ? `Loading...` : `Loaded!`}</h1>
			{:else}
				<button on:click={() => supabaseClient.auth.signOut()}>Sign out</button>
				<p>user:</p>
				<pre>{JSON.stringify($session.user, null, 2)}</pre>
				<p>client-side data fetching with RLS</p>
				<pre>{JSON.stringify(profile, null, 2)}</pre>
			{/if}
			<!-- {#await fetchProfile()}
				<div class="h-8 w-8 p-2">
					<CircularLoadingIndicator />
				</div>
			{:then data}
				<button
					type="button"
					on:click={() => (userMenuOpen = !userMenuOpen)}
					class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-800"
					id="user-menu-button"
					aria-expanded="false"
					aria-haspopup="true">
					<span class="sr-only">Open user menu</span>
					{#if data.avatar_url}
						<img class="h-8 w-8 rounded-full object-cover" src={data.avatar_url} alt="profile" />
					{:else}
						<div class="h-8 w-8 rounded-full object-cover overflow-hidden border">
							<EmptyProfilePicture />
						</div>
					{/if}
				</button>
			{:catch error}
				<p>{error.message}</p>
			{/await} -->

			{#if userMenuOpen}
				<div
					role="menu"
					class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-700 dark:ring-slate-800"
					aria-orientation="vertical"
					aria-labelledby="user-menu-button"
					tabindex="-1">
					<!-- Active: "bg-gray-100", Not Active: "" -->
					<a
						href="/profile"
						class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-50"
						role="menuitem"
						tabindex="-1"
						id="user-menu-item-0">My Profile</a>
					<a
						href="/login"
						on:click|preventDefault={logOut}
						class="block px-4 py-2 text-sm text-slate-700 dark:text-slate-50"
						role="menuitem"
						tabindex="-1"
						id="user-menu-item-2">Logout</a>
				</div>
			{/if}
		</div>
	</div>
</nav>
