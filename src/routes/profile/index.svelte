
<script lang="ts">
	import PrimaryButtonLink from '$lib/components/buttons/PrimaryButtonLink.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />

<section class="px-2 py-4 text-center dark:bg-slate-900">
	<h1 class="mb-4 text-2xl text-slate-700 dark:text-slate-100">Profile page</h1>
	<PrimaryButtonLink href="/profile/edit" text="Edit profile" />
</section>