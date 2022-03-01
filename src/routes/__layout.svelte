<script lang="ts">
import { goto } from '$app/navigation';

	import { user } from '$lib/stores';
	import supabase from '$lib/supabase';

	import '../app.css';

	user.set(supabase.auth.user());

  supabase.auth.onAuthStateChange((_, session)=>{
    user.set(session?.user);
    
  });

</script>

<slot />
