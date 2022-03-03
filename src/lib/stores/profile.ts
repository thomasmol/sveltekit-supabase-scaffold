import supabase from "$lib/supabase";
import { get, writable } from "svelte/store";

import { user } from "./auth";

export const profile = writable();

export const getProfile = async () => {
  const userId : string = get(user).id;
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id',userId).limit(1).single();
    if (error) throw error;
    profile.set(data);
  } catch (error) {
    console.error(error);
  }
};