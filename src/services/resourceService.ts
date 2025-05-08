
import { supabase } from '@/lib/supabase';

export const isResourceSaved = async (userId: string, resourceId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('saved_resources')
      .select('id')
      .eq('user_id', userId)
      .eq('resource_id', resourceId)
      .single();
    
    if (error) {
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking if resource is saved:', error);
    return false;
  }
};

export const toggleSaveResource = async (userId: string, resourceId: string): Promise<{ success: boolean; saved: boolean; error?: string }> => {
  try {
    // Check if it's already saved
    const { data, error: checkError } = await supabase
      .from('saved_resources')
      .select('id')
      .eq('user_id', userId)
      .eq('resource_id', resourceId)
      .single();
      
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is the error code for "no rows returned"
      console.error('Error checking if resource is saved:', checkError);
      return { success: false, saved: false, error: 'Failed to check if resource is saved' };
    }
    
    if (data) {
      // Resource is already saved, so delete it
      const { error: deleteError } = await supabase
        .from('saved_resources')
        .delete()
        .eq('id', data.id);
        
      if (deleteError) {
        console.error('Error deleting saved resource:', deleteError);
        return { success: false, saved: true, error: 'Failed to remove resource from saved items' };
      }
      
      return { success: true, saved: false };
    } else {
      // Resource is not saved, so save it
      const { error: insertError } = await supabase
        .from('saved_resources')
        .insert({ user_id: userId, resource_id: resourceId });
        
      if (insertError) {
        console.error('Error saving resource:', insertError);
        return { success: false, saved: false, error: 'Failed to save resource' };
      }
      
      return { success: true, saved: true };
    }
  } catch (error: any) {
    console.error('Error toggling save status:', error);
    return { success: false, saved: false, error: error.message || 'An unexpected error occurred' };
  }
};

export const getSavedResources = async (userId: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('saved_resources')
      .select('resource_id')
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching saved resources:', error);
      return [];
    }
    
    return data.map(item => item.resource_id);
  } catch (error) {
    console.error('Error fetching saved resources:', error);
    return [];
  }
};
