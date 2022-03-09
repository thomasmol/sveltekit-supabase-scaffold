<script lang="ts" context="module">
	import { authGuard } from '$lib/guards';

	export async function load({ url, session }) {
		return { url, session };
	} 
</script>

<script lang="ts">
	import '../app.css';
	import { session } from '$app/stores';
	import { auth, setAuthCookie, unsetAuthCookie } from '$lib/supabase';

	auth.onAuthStateChange(async (event, _session) => {
		await setAuthCookie(_session);
		if (event !== 'SIGNED_OUT') {
			session.set({ user: _session.user, authenticated: !!_session.user });
		} else {
			session.set({ user: undefined, authenticated: false });
			await unsetAuthCookie();
		}
	});
</script>

<slot />
