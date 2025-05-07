
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

// Helper function to create database schema
export const checkAndCreateTables = async () => {
  try {
    console.log("Checking and creating necessary tables if they don't exist...");
    
    // Check if topics table exists, if not create it
    const { error: topicsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'topics',
      table_definition: `
        id uuid primary key default uuid_generate_v4(),
        name text not null,
        description text not null,
        long_description text not null,
        icon text not null,
        color text not null,
        text_color text not null,
        created_at timestamp with time zone default now()
      `
    });
    
    if (topicsError) {
      console.error("Error creating topics table:", topicsError);
    }
    
    // Check if resources table exists, if not create it
    const { error: resourcesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'resources',
      table_definition: `
        id uuid primary key default uuid_generate_v4(),
        topic_id uuid not null references topics(id),
        title text not null,
        description text not null,
        file_path text not null,
        file_size text not null,
        file_type text not null,
        created_at timestamp with time zone default now()
      `
    });
    
    if (resourcesError) {
      console.error("Error creating resources table:", resourcesError);
    }
    
    // Check if profiles table exists, if not create it
    const { error: profilesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'profiles',
      table_definition: `
        id uuid primary key default uuid_generate_v4(),
        user_id uuid not null unique references auth.users(id),
        full_name text not null,
        grade text,
        avatar_url text,
        updated_at timestamp with time zone default now()
      `
    });
    
    if (profilesError) {
      console.error("Error creating profiles table:", profilesError);
    }
    
    // Check if related_topics table exists, if not create it
    const { error: relatedTopicsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'related_topics',
      table_definition: `
        id uuid primary key default uuid_generate_v4(),
        topic_id uuid not null references topics(id),
        related_topic_id uuid not null references topics(id),
        unique(topic_id, related_topic_id)
      `
    });
    
    if (relatedTopicsError) {
      console.error("Error creating related_topics table:", relatedTopicsError);
    }
    
    // Check if saved_resources table exists, if not create it
    const { error: savedResourcesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'saved_resources',
      table_definition: `
        id uuid primary key default uuid_generate_v4(),
        user_id uuid not null references auth.users(id),
        resource_id uuid not null references resources(id),
        created_at timestamp with time zone default now(),
        unique(user_id, resource_id)
      `
    });
    
    if (savedResourcesError) {
      console.error("Error creating saved_resources table:", savedResourcesError);
    }
    
    console.log("Database schema check completed.");
    
  } catch (error) {
    console.error("Error checking and creating tables:", error);
  }
};
