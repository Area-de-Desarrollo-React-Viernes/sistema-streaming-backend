import { createClient } from "@supabase/supabase-js";
import { CONFIG } from "../../config/config";

const subapabeUrl = CONFIG.supabase.url as string;
const supabaseKey = CONFIG.supabase.key as string;

export const supabase = createClient(subapabeUrl, supabaseKey);