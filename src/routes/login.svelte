<script lang="ts">
	import { goto } from '$app/navigation';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';
	import CircularLoadingIndicator from '$lib/components/svg/CircularLoadingIndicator.svelte';
  import supabaseClient from '$lib/supabase'

	let loading: boolean = false;
	let errorMessage: string;
	let email: string;
	let password: string;

	const handleLogin = async () => {
	try {
			loading = true;
			let { user: userDetails, error } = await supabaseClient.auth.signIn({
				email: email,
				password: password
			});
			goto('/');
			if (error) throw error;
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
		<h1 class="mb-4 text-4xl font-medium text-slate-800 dark:text-slate-50">Welcome back!</h1>
		<p class="text-slate-600 dark:text-slate-100">Please login using your credentials.</p>
	</div>
	<form
		on:submit|preventDefault={handleLogin}
		class="mx-4 flex max-w-lg flex-col rounded-lg border bg-white py-8 px-10 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:mx-auto ">
		<label for="email" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Email</label>
		<input
			bind:value={email}
			name="email"
			type="email"
			id="email"
			autocomplete="email"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50" />
		<label for="password" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Password</label>
		<input
			bind:value={password}
			name="password"
			type="password"
			id="password"
			autocomplete="current-password"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50" />
		<a href="/forgotpassword" class="mb-4 text-right text-teal-300 hover:text-teal-400"
			>I forgot my password</a>
		{#if errorMessage}
			<p class="mb-4 rounded p-1 text-red-800">
				{errorMessage}, please try again.
			</p>
		{/if}
		{#if !loading}
			<PrimaryButton type="submit" text="Sign in" />
		{:else}
			<PrimaryButton type="submit" text="Processing..." disabled={true}>
				<CircularLoadingIndicator slot="icon" />
			</PrimaryButton>
		{/if}
		<p class="mt-6 text-slate-700 dark:text-slate-300">
			Not registered yet? <a href="/register" class="font-medium text-teal-300 hover:text-teal-400"
				>Sign up here</a>
		</p>
	</form>
</section>
