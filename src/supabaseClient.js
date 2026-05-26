import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Enable mock local storage mode if keys are not configured or are placeholder keys
export const isMockEnabled = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id') || supabaseAnonKey.includes('your-anon-public-key');

if (isMockEnabled) {
  console.warn(
    'Supabase keys are not configured. Running in Local Mock mode. Data will be saved in LocalStorage.'
  );
}

export const supabase = !isMockEnabled ? createClient(supabaseUrl, supabaseAnonKey) : null;

