<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import CircularLoadingIndicator from '$lib/components/svg/CircularLoadingIndicator.svelte';
	import EmptyProfilePicture from '$lib/components/svg/EmptyProfilePicture.svelte';
	import { clickOutside } from '$lib/clickOutside';

	let userMenuOpen = false;

	const logOut = async () => {
		let { error } = await supabase.auth.signOut();
		goto('/welcome');
	};

	const fetchProfile = async () => {
		const response = await fetch('/api/profile');
		if (response.ok){
			return await response.json();
		}
	};
	
</script>
<nav class="bg-slate-100 py-4">
	<div class="container mx-auto flex justify-between px-4">
		<a href="/" class="font-medium text-slate-700 hover:text-slate-900"
			>SvelteKit + Supabase Scaffold</a>
		<div class="relative" use:clickOutside on:clickoutside={() => (userMenuOpen = false)}>
			{#await fetchProfile()}
				<div class="h-8 w-8 p-2">
					<CircularLoadingIndicator />
				</div>
			{:then data}
				<button
					type="button"
					on:click={() => (userMenuOpen = !userMenuOpen)}
					class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
			{/await}
			{#if userMenuOpen}
				<div
					role="menu"
					class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					aria-orientation="vertical"
					aria-labelledby="user-menu-button"
					tabindex="-1">
					<!-- Active: "bg-gray-100", Not Active: "" -->
					<a
						href="/profile"
						class="block px-4 py-2 text-sm text-gray-700"
						role="menuitem"
						tabindex="-1"
						id="user-menu-item-0">My Profile</a>
					<a
						href="/login"
						on:click|preventDefault={logOut}
						class="block px-4 py-2 text-sm text-gray-700"
						role="menuitem"
						tabindex="-1"
						id="user-menu-item-2">Logout</a>
				</div>
			{/if}
		</div>
	</div>
</nav>