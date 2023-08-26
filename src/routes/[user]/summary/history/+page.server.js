import { supabase } from "$lib/db";
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async(loadEvent) => {
  const { fetch } = loadEvent
  const username = loadEvent.params.user;
  const queryParams = new URLSearchParams({source_member_id: username}).toString();
  const url = `/api/transaction_info_user?${queryParams}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    const data = await res.json();
    let transac = data;
    return {
      transac
    }
  } else {
    console.log(`Error ${res.status}: ${res.statusText}`)
  }
}