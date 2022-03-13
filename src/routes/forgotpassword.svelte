<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import CircularLoadingIndicator from '$lib/components/svg/CircularLoadingIndicator.svelte';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';

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

<section class="min-w-screen min-h-screen bg-slate-50 dark:bg-slate-900">
	<div class="mx-4 py-10 text-center sm:mx-auto">
		<h1 class="mb-4 text-4xl font-medium text-slate-800 dark:text-slate-50">Reset your password</h1>
		<p class="text-slate-600 dark:text-slate-100">Enter your email to receive a password reset link.</p>
	</div>
	<form
		on:submit|preventDefault={handleResetLink}
		class="mx-4 flex max-w-lg flex-col rounded-lg border bg-white py-8 px-10 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:mx-auto ">
		<label for="email" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Email</label>
		<input
			bind:value={email}
			type="email"
			id="email"
			autocomplete="email"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50" />
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
			<PrimaryButton type="submit" text="Send password reset link" />
		{:else}
			<PrimaryButton type="submit" text="Processing..." disabled={true}>
				<CircularLoadingIndicator slot="icon" />
			</PrimaryButton>
		{/if}
	</form>
</section>
