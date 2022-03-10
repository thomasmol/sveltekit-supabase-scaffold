<script lang="ts" context="module">
	import { authGuard } from '$lib/guards';

	export async function load({ url, session }) {
		return authGuard({ url, session });
	} 
</script>

<script lang="ts">
	import '../app.css';
	import { session } from '$app/stores';
	import { auth, setAuthCookie, unsetAuthCookie } from '$lib/supabase';

	auth.onAuthStateChange(async (event, _session) => {
		if (event !== 'SIGNED_OUT') {
			await setAuthCookie(_session);
			session.set({ user: _session.user, authenticated: !!_session.user });			
		} else {
			session.set({ user: undefined, authenticated: false });
			await unsetAuthCookie();
		}
	});
</script>

<slot />
