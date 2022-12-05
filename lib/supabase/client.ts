import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Create a single supabase client.
 */
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)
