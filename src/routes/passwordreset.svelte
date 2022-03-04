<script lang="ts">
	import supabase from '$lib/supabase';
	import CircularLoadingIndicator from '$lib/components/svg/CircularLoadingIndicator.svelte';
	import { goto } from '$app/navigation';

	let password = '';
	let loading = false;
	let errorMessage;
	let successMessage;

	const handleResetLink = async () => {
		try {
			loading = true;
			const accessToken = supabase.auth['currentSession'].access_token;
			const { error, data } = await supabase.auth.api.updateUser(accessToken, {
				password: password
			});
			if (error) throw error;
			successMessage = `Password changed. You can now login with your new password.`;
			goto('/');
		} catch (error) {
			console.error(error);
			errorMessage = error.message;
		} finally {
			loading = false;
		}
	};
</script>

<section class="min-w-screen min-h-screen bg-slate-50">
	<div class="mx-4 py-10 text-center sm:mx-auto">
		<h1 class="mb-4 text-4xl font-medium text-slate-800">Change your password</h1>
		<p class="text-slate-600">Enter a new password.</p>
	</div>
	<form
		on:submit|preventDefault={handleResetLink}
		class="mx-4 flex max-w-lg flex-col rounded-lg border bg-white py-8 px-10 shadow-sm sm:mx-auto ">
		<label for="email" class="font-medium text-slate-700">Password</label>
		<input
			bind:value={password}
			type="password"
			id="password"
			autocomplete="new-password"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400" />
		{#if errorMessage}
			<p class="mb-4 rounded p-1 text-red-800">
				{errorMessage}, please try again.
			</p>
		{/if}
		{#if successMessage}
			<p class="mb-4 rounded p-1 text-green-800">
				{successMessage}
				<a href="/login" class="text-teal-700 hover:text-teal-800">Click here to login</a>
			</p>
		{/if}
		{#if !loading}
			<button
				type="submit"
				class="rounded bg-teal-500 py-2 px-3 text-white transition ease-in-out hover:bg-teal-600"
				>Save new password</button>
		{:else}
			<button
				type="button"
				class="rounded bg-teal-500 py-2 px-3 text-white inline-flex items-center justify-center transition ease-in-out"
				disabled><CircularLoadingIndicator />Processing...</button>
		{/if}
	</form>
</section>
