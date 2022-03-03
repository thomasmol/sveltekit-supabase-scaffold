<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import CircularLoadingIndicator from '$lib/components/svg/CircularLoadingIndicator.svelte';

	let email = '';
	let loading = false;
	let errorMessage;
	let successMessage;

	const handleResetLink = async () => {
		try {
			loading = true;
			const { data, error } = await supabase.auth.api.resetPasswordForEmail(email, {
				redirectTo: 'http://localhost:3000/passwordreset'
			});
			if (error) throw error;
			successMessage = `Email sent. Check the inbox of ${email} for a password reset link.`;
		} catch (error) {
			console.error(error);
			errorMessage = error.message;
		} finally {
			loading = false;
		}
	};
</script>

<section class="min-w-screen min-h-screen bg-slate-50">
	<div class="py-10 text-center">
		<h1 class="mb-4 text-4xl font-medium text-slate-800">Reset your password</h1>
		<p class="text-slate-600">Enter your email to receive a password reset link.</p>
	</div>
	<form
		on:submit|preventDefault={handleResetLink}
		class="mx-auto flex max-w-lg flex-col rounded-lg border bg-white py-8 px-10 shadow-sm ">
		<label for="email" class="font-medium text-slate-700">Email</label>
		<input
			bind:value={email}
			type="email"
			id="email"
			autocomplete="email"
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
			</p>
		{/if}
		{#if !loading}
			<button
				type="submit"
				class="rounded bg-teal-500 py-2 px-3 text-white transition ease-in-out hover:bg-teal-600"
				>Send password reset link</button>
		{:else}
			<button
				type="button"
				class="rounded bg-teal-500 py-2 px-3 text-white inline-flex items-center justify-center transition ease-in-out"
				disabled><CircularLoadingIndicator />Processing...</button>
		{/if}
	</form>
</section>
