<script lang="ts">
	import { goto } from '$app/navigation';
	import CircularLoadingIndicator from '$lib/components/svg/CircularLoadingIndicator.svelte';
	import supabase from '$lib/supabase';

	let loading: boolean = false;
	let errorMessage: string;
	let email: string;
	let password: string;

	const handleLogin = async () => {
		try {
			loading = true;
			let { user: userDetails, error } = await supabase.auth.signIn({
				email: email,
				password: password
			});
			if (error) throw error;
			location.reload();
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
		<h1 class="mb-4 text-4xl font-medium text-slate-800">Welcome back!</h1>
		<p class="text-slate-600">Please login using your credentials.</p>
	</div>
	<form
		on:submit|preventDefault={handleLogin}
		class="mx-4 flex max-w-lg flex-col rounded-lg border bg-white py-8 px-10 shadow-sm sm:mx-auto ">
		<label for="email" class="font-medium text-slate-700">Email</label>
		<input
			bind:value={email}
			name="email"
			type="email"
			id="email"
			autocomplete="email"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400" />
		<label for="password" class="font-medium text-slate-700">Password</label>
		<input
			bind:value={password}
			name="password"
			type="password"
			id="password"
			autocomplete="current-password"
			placeholder=""
			required
			class="mb-2 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400" />
		<a href="/forgotpassword" class="mb-4 text-right text-teal-700 hover:text-teal-800"
			>I forgot my password</a>
		{#if errorMessage}
			<p class="mb-4 rounded p-1 text-red-800">
				{errorMessage}, please try again.
			</p>
		{/if}
		{#if !loading}
			<button
				type="submit"
				class="rounded bg-teal-500 py-2 px-3 text-white transition ease-in-out hover:bg-teal-600"
				>Login</button>
		{:else}
			<button
				type="button"
				class="rounded bg-teal-500 py-2 px-3 text-white inline-flex items-center justify-center transition ease-in-out"
				disabled><CircularLoadingIndicator />Processing...</button>
		{/if}
		<p class="mt-6 text-slate-700">
			Not registered yet? <a href="/register" class="font-medium text-teal-700 hover:text-teal-800"
				>Register here</a>
		</p>
	</form>
</section>
