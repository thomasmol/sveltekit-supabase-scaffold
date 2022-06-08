import { skHelper } from '@supabase/auth-helpers-sveltekit';

const supbaseUrl: string = import.meta.env.VITE_SUPABASE_URL as string;
const supbaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const options = { 
  persistSession: false,
}
const {supabaseClient} = skHelper(supbaseUrl, supbaseAnonKey);

export default supabaseClient;