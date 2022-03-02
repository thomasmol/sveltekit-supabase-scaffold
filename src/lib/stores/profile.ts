import supabase from "$lib/supabase";
import { writable } from "svelte/store";
import { user } from "./auth";

export const profile = writable();

export const getProfile = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1).single();
    if (error) throw error;
    profile.set(data);
  } catch (error) {
    console.error(error);
  }
};