import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if keys are placeholders or not configured
const hasPlaceholderKeys = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id') || supabaseAnonKey.includes('your-anon-public-key');

// Enable mock local storage mode if keys are placeholders or if explicitly toggled in localStorage
export const isMockEnabled = localStorage.getItem('saraswathy_use_mock_db') === 'true' || hasPlaceholderKeys;

if (isMockEnabled) {
  console.warn(
    'Running in Local Mock database mode. Data will be read and written to LocalStorage.'
  );
}

export const supabase = !isMockEnabled && supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;


