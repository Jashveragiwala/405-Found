import { supabase } from "$lib/db";
import { error, redirect } from '@sveltejs/kit';

export const load = async (event) => {
  const { data: users }= await supabase.from("bankapp_users").select().eq('source_member_id', event.params.user);
  if (users?.length === 0) {
    throw error(404, "User table is empty")
  }
  const [user] = users;
  const {data: progs} = await supabase.from("bankapp_programs").select().eq("lp_id", event.params.programme);
    if (progs === null) throw error(404, "Programme does not exist");
  const [prog] = progs;

  const urlParams = event.url.searchParams;
  const member = urlParams.get("member");
  const points = urlParams.get("points");

  if (member === null && points === null && urlParams.toString().length != 0) {
    throw redirect(307, event.url.pathname);
  }
  if (member !== null) {
    if (!new RegExp(prog.id_format).test(member)) {
      console.log("member FAIL")
      throw redirect(307, event.url.pathname);
    } else {
      console.log("call member validation api");
      console.log("member PASS")
    }
  }
  if (points !== null) {
    if (!/^\d+$/.test(points)) {
      console.log("points FAIL")
      throw redirect(307, event.url.pathname + `?member=${member}`)
    } else if (member === null) {
      console.log("points FAIL")
      throw redirect(307, event.url.pathname)
    } else {
      console.log("points PASS")
    }
  }

  return {
    user,
    prog,
  };
} 