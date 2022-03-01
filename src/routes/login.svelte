<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { user } from '$lib/stores';
	import CircularLoadingIndicator from '$lib/components/CircularLoadingIndicator.svelte';

	let email = '';
	let password = '';
	let loading = false;
	let errorMessage;

	const handleLogin = async () => {
		try {
			loading = true;
			let { user: userDetails, error } = await supabase.auth.signIn({
				email: email,
				password: password
			});
			if (error) throw error;
			$user = userDetails;
			goto('/');
		} catch (error) {
			console.error(error);
			errorMessage = error.message;
		} finally {
			loading = false;
		}
	};
</script>

<section class="bg-slate-50 min-h-screen min-w-screen">
	<div class="py-10 text-center">
		<h1 class="text-xl font-medium text-slate-800">Login to your account</h1>
	</div>
	<form
		on:submit|preventDefault={handleLogin}
		class="mx-auto flex max-w-lg flex-col rounded-md border p-10 shadow bg-white ">
		<label for="email" class="text-slate-700">Email</label>
		<input
			bind:value={email}
			type="email"
			id="email"
			autocomplete="email"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 outline-none focus:border-teal-500 focus:ring-teal-400" />
		<label for="password" class="text-slate-700">Password</label>
		<input
			bind:value={password}
			type="password"
			id="password"
			autocomplete="current-password"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 outline-none focus:border-teal-500 focus:ring-teal-400" />
		{#if errorMessage}
			<p class="mb-4 rounded border border-red-300 bg-red-200 p-1">
				{errorMessage}, please try again.
			</p>
		{/if}
		{#if !loading}
			<button type="submit" class="rounded bg-teal-500 py-2 px-3 text-white">Login</button>
		{:else}
			<button type="button" class="rounded bg-teal-500 py-2 px-3 text-white inline-flex items-cente" disabled
				><CircularLoadingIndicator />Processing...</button>
		{/if}
	</form>
</section>
