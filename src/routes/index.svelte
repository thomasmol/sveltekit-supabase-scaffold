<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import CircularLoadingIndicator from '$lib/components/CircularLoadingIndicator.svelte';
	import { user } from '$lib/stores/auth';
	import EmptyProfilePicture from '$lib/components/svg/EmptyProfilePicture.svelte';

	const logOut = async () => {
		let { error } = await supabase.auth.signOut();
		goto('/welcome');
	};

	const fetchProfile = async () => {
		const userId: string = $user.id;
		const { data, error } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', userId)
			.limit(1)
			.single();
		if (error) throw error;
		return data;
	};
</script>

<section>
	<h1 class="px-3 py-10 text-center text-2xl text-slate-700">
		Welcome to SvelteKit + Supabase Scaffold
	</h1>
	<div id="profile" class="mx-auto max-w-xl rounded-md border bg-white p-4">
		<a
			on:click|preventDefault={logOut}
			href="/logout"
			class="rounded-md bg-teal-50 px-3 py-2 hover:bg-teal-600">Logout</a>
		{#await fetchProfile()}
			<CircularLoadingIndicator />
		{:then data}
			<h2>Welcome back {data.first_name}!</h2>
			{#if data.avatar_url}
				<img
					class="h-16 w-16 object-cover rounded-full"
					src={data.avatar_url}
					alt="Current profile" />
			{:else}
				<div class="h-16 w-16 object-cover rounded-full overflow-hidden border">
					<EmptyProfilePicture />
				</div>
			{/if}
			<a
				href="/profile/edit"
				class="rounded bg-teal-500 py-2 px-8 text-white transition ease-in-out hover:bg-teal-600"
				>Edit profile</a>
		{:catch error}
			<p>{error}</p>
		{/await}
	</div>
</section>
