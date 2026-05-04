import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: "../.env" })

const URL = process.env.SUPABASE_URL
const API_KEY = process.env.SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(URL, API_KEY)