<script context="module" lang="ts">
	import { authGuard } from '$lib/guards';
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export const load = async ({url, session }) => {
		return authGuard({url, session});
	};
</script>


<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import supabaseClient  from '$lib/supabase';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';
	import '../app.css';
	const onUserUpdate = async (user) => {
		if (user) await goto('/');
	};
</script>

<SupaAuthHelper {supabaseClient} {onUserUpdate} {session}>
	<slot />
</SupaAuthHelper>