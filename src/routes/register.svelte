<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { user } from '$lib/stores/auth';
	import CircularLoadingIndicator from '$lib/components/svg/CircularLoadingIndicator.svelte';

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let loading = false;
	let errorMessage;

	const handleRegistration = async () => {
		try {
			loading = true;
			let { user: userDetails, error } = await supabase.auth.signUp({
				email: email,
				password: password
			});
			if (error) throw error;
			const { error: profileError } = await supabase
				.from('profiles')
				.insert(
					{ id: userDetails.id, first_name: firstName, last_name: lastName },
					{ returning: 'minimal' }
				);
			if (profileError) throw profileError;
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
		<h1 class="mb-4 text-4xl font-medium text-slate-800">Welcome to ...</h1>
		<p class="text-slate-600">Register a new account to start.</p>
	</div>
	<form
		on:submit|preventDefault={handleRegistration}
		class="mx-4 flex max-w-lg flex-col rounded-lg border bg-white py-8 px-10 shadow-sm sm:mx-auto ">
		<label for="firstName" class="font-medium text-slate-700">First name</label>
		<input
			bind:value={firstName}
			type="text"
			id="firstName"
			autocomplete="name"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400" />
		<label for="lastName" class="font-medium text-slate-700">Last Name</label>
		<input
			bind:value={lastName}
			type="text"
			id="lastName"
			autocomplete="family-name"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400" />
		<label for="email" class="font-medium text-slate-700">Email</label>
		<input
			bind:value={email}
			type="email"
			id="email"
			autocomplete="email"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400" />
		<label for="password" class="font-medium text-slate-700">Password</label>
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
		{#if !loading}
			<button
				type="submit"
				class="rounded bg-teal-500 py-2 px-3 text-white transition ease-in-out hover:bg-teal-600"
				>Create account</button>
		{:else}
			<button
				type="button"
				class="rounded bg-teal-500 py-2 px-3 text-white inline-flex items-center justify-center transition ease-in-out"
				disabled><CircularLoadingIndicator />Processing...</button>
		{/if}
		<p class="mt-6 text-slate-700">
			Already have an account? <a
				href="/login"
				class="font-medium text-teal-700 hover:text-teal-800">Login here</a>
		</p>
	</form>
</section>
