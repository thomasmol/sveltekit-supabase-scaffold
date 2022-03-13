<script lang="ts">
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { user } from '$lib/stores/auth';
	import CircularLoadingIndicator from '$lib/components/svg/CircularLoadingIndicator.svelte';
	import PrimaryButton from '$lib/components/buttons/PrimaryButton.svelte';

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
			location.reload();
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
		<h1 class="mb-4 text-4xl font-medium text-slate-800 dark:text-slate-50">Welcome to ...</h1>
		<p class="text-slate-600 dark:text-slate-100">Register a new account to start.</p>
	</div>
	<form
		on:submit|preventDefault={handleRegistration}
		class="mx-4 flex max-w-lg flex-col rounded-lg border bg-white py-8 px-10 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:mx-auto ">
		<label for="firstName" class="mb-2 font-medium text-slate-700 dark:text-slate-200">First name</label>
		<input
			bind:value={firstName}
			type="text"
			id="firstName"
			autocomplete="name"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50" />
		<label for="lastName" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Last Name</label>
		<input
			bind:value={lastName}
			type="text"
			id="lastName"
			autocomplete="family-name"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50" />
		<label for="email" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Email</label>
		<input
			bind:value={email}
			type="email"
			id="email"
			autocomplete="email"
			placeholder=""
			required
			class="mb-4 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50" />
		<label for="password" class="mb-2 font-medium text-slate-700 dark:text-slate-200">Password</label>
		<input
			bind:value={password}
			type="password"
			id="password"
			autocomplete="new-password"
			placeholder=""
			required
			class="mb-8 rounded border-slate-300 shadow-sm outline-none focus:border-teal-500 focus:ring-teal-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50" />
		{#if errorMessage}
			<p class="mb-4 rounded p-1 text-red-800">
				{errorMessage}, please try again.
			</p>
		{/if}
		{#if !loading}
			<PrimaryButton type="submit" text="Sign up" />
		{:else}
			<PrimaryButton type="submit" text="Processing..." disabled={true}>
				<CircularLoadingIndicator slot="icon" />
			</PrimaryButton>
		{/if}
		<p class="mt-6 text-slate-700 dark:text-slate-300">
			Already have an account? <a
				href="/login"
				class="font-medium text-teal-300 hover:text-teal-400">Sign in here</a>
		</p>
	</form>
</section>
