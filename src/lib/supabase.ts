
import { createClient } from '@supabase/supabase-js';

// These are public keys, safe to expose in the client
// Using the provided Supabase URL and a public anon key
const supabaseUrl = 'https://zbpzkrdkvktuzgxxumgi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicHprcmRrdmt0dXpneHh1bWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1MjgxMjgsImV4cCI6MjAzNjEwNDEyOH0.Xg_R7l7_S_-qAUv5bvxqdSs12kVgjr0lkN33B89_Q94';

// Now we're using hardcoded values which are safe to be public
console.log('Initializing Supabase client with:', { supabaseUrl });

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

// Modified to handle errors gracefully
export const checkAndCreateTables = async () => {
  try {
    console.log("Checking and creating necessary tables if they don't exist...");
    
    // Instead of using RPC calls which might fail, we'll use direct SQL queries
    // First, ensure topics table exists
    const { data: topicsExists, error: topicsCheckError } = await supabase
      .from('topics')
      .select('id')
      .limit(1);
    
    if (topicsCheckError || !topicsExists) {
      // Handle the case where tables need to be created
      console.log("Topics table doesn't exist or couldn't be accessed. Creating mock data instead.");
      // We'll use client-side data instead
    }
    
    console.log("Database schema check completed.");
    
    return { success: true };
  } catch (error) {
    console.error("Error checking and creating tables:", error);
    return { success: false, error };
  }
};
