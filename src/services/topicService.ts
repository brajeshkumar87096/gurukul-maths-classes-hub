
import { supabase, Topic, Resource, RelatedTopic } from '@/lib/supabase';

export const fetchAllTopics = async (): Promise<Topic[]> => {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }

  return data || [];
};

export const fetchTopicById = async (topicId: string): Promise<Topic | null> => {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('id', topicId)
    .single();

  if (error) {
    console.error(`Error fetching topic ${topicId}:`, error);
    return null;
  }

  return data;
};

export const fetchResourcesByTopicId = async (topicId: string): Promise<Resource[]> => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('topic_id', topicId)
    .order('title');

  if (error) {
    console.error(`Error fetching resources for topic ${topicId}:`, error);
    throw error;
  }

  return data || [];
};

export const fetchRelatedTopics = async (topicId: string): Promise<Topic[]> => {
  // First get the related topic IDs
  const { data: relatedData, error: relatedError } = await supabase
    .from('related_topics')
    .select('related_topic_id')
    .eq('topic_id', topicId);

  if (relatedError) {
    console.error(`Error fetching related topics for ${topicId}:`, relatedError);
    throw relatedError;
  }

  if (!relatedData || relatedData.length === 0) {
    return [];
  }

  // Extract the related topic IDs
  const relatedTopicIds = relatedData.map(item => item.related_topic_id);

  // Then fetch the actual topic data
  const { data: topicsData, error: topicsError } = await supabase
    .from('topics')
    .select('*')
    .in('id', relatedTopicIds);

  if (topicsError) {
    console.error('Error fetching related topic details:', topicsError);
    throw topicsError;
  }

  return topicsData || [];
};

export const downloadResource = async (filePath: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('resources')
    .createSignedUrl(filePath, 60); // URL valid for 60 seconds

  if (error) {
    console.error(`Error generating download URL for ${filePath}:`, error);
    throw error;
  }

  return data.signedUrl;
};

export const saveResourceForUser = async (userId: string, resourceId: string): Promise<void> => {
  const { error } = await supabase
    .from('saved_resources')
    .insert({ user_id: userId, resource_id: resourceId });

  if (error) {
    console.error(`Error saving resource ${resourceId} for user ${userId}:`, error);
    throw error;
  }
};
