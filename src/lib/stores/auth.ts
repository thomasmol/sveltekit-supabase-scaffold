import { writable } from "svelte/store";
import supabase from "$lib/supabase";

export const user = writable(supabase.auth.user() || false);