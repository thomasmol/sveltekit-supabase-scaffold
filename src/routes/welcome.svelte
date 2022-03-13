<script lang="ts">
	import PrimaryButtonLink from '$lib/components/buttons/PrimaryButtonLink.svelte';
	import SecondaryButtonLink from '$lib/components/buttons/SecondaryButtonLink.svelte';
</script>

<section class="min-w-screen min-h-screen bg-slate-50 py-32 dark:bg-slate-900">
	<div
		class="mx-4 flex max-w-xl flex-col rounded-lg border bg-white p-4 py-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:mx-auto ">
		<h1 class="mb-4 text-xl font-medium text-slate-800 dark:text-slate-50">
			Welcome to SvelteKit + Supabase scaffold
		</h1>
		<p class="mb-10 text-slate-700 dark:text-slate-100">Some text about your amazing product!</p>
		<div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 ">
			<PrimaryButtonLink text="Register a new account" href="/register" />
			<SecondaryButtonLink text="Login to a existing account" href="/login" />
		</div>
	</div>
</section>
