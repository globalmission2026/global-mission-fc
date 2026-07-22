import { createClient } from '@supabase/supabase-js';

function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing ${key} environment variable`);
  return value;
}

export const supabase = createClient(
  getEnvOrThrow('NEXT_PUBLIC_SUPABASE_URL'),
  getEnvOrThrow('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
);
