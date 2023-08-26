import { supabase } from "$lib/db";
import { error } from "@sveltejs/kit";

export async function load({params}) {
    const {data} = await supabase.from("bankapp_programs").select().eq("lp_id", params.programme);
    const { data: dt }= await supabase.from("bankapp_users").select().eq('source_member_id',`${params.user}`);
    let users = dt;
    console.log(data)
    if (data?.length === 0) {
        throw error(404, "Programme does not exist")
    } 
    else if (users?.length === 0) {
        throw error(404, "User does not exist")
    }
    return {progs: data};
}