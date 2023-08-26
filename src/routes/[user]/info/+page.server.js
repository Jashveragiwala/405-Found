import { supabase } from "$lib/db";
import { error, fail } from '@sveltejs/kit';

export const load = async ({params}) => {
  const { data }= await supabase.from("bankapp_users").select().eq('source_member_id',`${params.user}`);
  let users = data;
  if (users?.length === 0) {
    throw error(404, "User table is empty" )
  } else {
    return {
      users
    };
  }
} 
