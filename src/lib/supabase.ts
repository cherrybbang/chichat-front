import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "YOUR_URL";
const supabaseAnonKey = "YOUR_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);