import { supabase } from "$lib/db";
import { error } from '@sveltejs/kit';

export const load = async (event) => {
  const { data }= await supabase.from("bankapp_users").select().eq('source_member_id',`${event.params.user}`);
  let users = data;
  if (users == null) {
    throw error(404, "User table is empty")
  }
  return {
    users
  };
}