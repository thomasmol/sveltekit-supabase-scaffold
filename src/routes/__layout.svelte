<script lang=ts context=module>
	 import { authGuard } from '$lib/guards';

  export async function load({ url }) {
    return await authGuard({ url });
  }
</script>

<script lang="ts">

	import { user } from '$lib/stores/auth';
	import supabase from '$lib/supabase';

	import '../app.css';

	user.set(supabase.auth.user());

  supabase.auth.onAuthStateChange((_, session)=>{
    user.set(session?.user);
    
  });

</script>

<slot />
