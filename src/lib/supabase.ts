
import { createClient } from '@supabase/supabase-js';

// These are public keys, safe to expose in the client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our Supabase tables
export type Topic = {
  id: string;
  name: string;
  description: string;
  long_description: string;
  icon: string;
  color: string;
  text_color: string;
  created_at: string;
};

export type Resource = {
  id: string;
  topic_id: string;
  title: string;
  description: string;
  file_path: string;
  file_size: string;
  file_type: string;
  created_at: string;
};

export type RelatedTopic = {
  id: string;
  topic_id: string;
  related_topic_id: string;
};

export type Profile = {
  id: string;
  user_id: string;
  full_name: string;
  grade?: string;
  avatar_url?: string;
  updated_at: string;
};

export type SavedResource = {
  id: string;
  user_id: string;
  resource_id: string;
  created_at: string;
};
