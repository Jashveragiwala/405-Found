import { supabase } from "$lib/db";
import { redirect } from "@sveltejs/kit";

export async function load(event) {
    const sParams = event.url.searchParams;
    const transac_id = sParams.get("transac_id");
    console.log(transac_id)

    if (transac_id === null) {
        throw redirect(307, "./fail");
    }

    setTimeout(() => {}, 5000)
    const {data} = await supabase.from("transactions").select("transac_id").eq("transac_id", transac_id);
    console.log("data",data)
    if(data.length === 0) {
        throw redirect(307, "./fail");
    }
}