import { createClient } from '@supabase/supabase-js'

const supbaseUrl: string = (import.meta.env.VITE_SUPABASE_URL).toString();
const supbaseAnonKey: string = (import.meta.env.VITE_SUPABASE_ANON_KEY).toString();

const supabase = createClient(
  supbaseUrl,
  supbaseAnonKey
)

export default supabase