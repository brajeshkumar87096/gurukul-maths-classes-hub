
import { supabase, Resource, SavedResource } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export const uploadResource = async (
  file: File,
  title: string,
  description: string,
  topicId: string
): Promise<{ success: boolean; error?: string; resourceId?: string }> => {
  try {
    // 1. Upload the file to storage
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `${topicId}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('resources')
      .upload(filePath, file);
      
    if (uploadError) {
      throw uploadError;
    }
    
    // 2. Create the resource record in the database
    const { data: resource, error: resourceError } = await supabase
      .from('resources')
      .insert({
        topic_id: topicId,
        title: title,
        description: description,
        file_path: filePath,
        file_size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        file_type: fileExtension?.toLowerCase() || 'unknown',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
      
    if (resourceError) {
      // If there was an error creating the resource, try to delete the uploaded file
      await supabase.storage.from('resources').remove([filePath]);
      throw resourceError;
    }
    
    return { success: true, resourceId: resource.id };
    
  } catch (error: any) {
    console.error("Error uploading resource:", error);
    return { success: false, error: error.message || "Failed to upload resource" };
  }
};

export const deleteResource = async (resourceId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // 1. Get the resource to find its file path
    const { data: resource, error: fetchError } = await supabase
      .from('resources')
      .select('file_path')
      .eq('id', resourceId)
      .single();
      
    if (fetchError) {
      throw fetchError;
    }
    
    if (!resource) {
      throw new Error("Resource not found");
    }
    
    // 2. Delete the file from storage
    const { error: deleteStorageError } = await supabase.storage
      .from('resources')
      .remove([resource.file_path]);
      
    if (deleteStorageError) {
      throw deleteStorageError;
    }
    
    // 3. Delete the resource record from the database
    const { error: deleteRecordError } = await supabase
      .from('resources')
      .delete()
      .eq('id', resourceId);
      
    if (deleteRecordError) {
      throw deleteRecordError;
    }
    
    return { success: true };
    
  } catch (error: any) {
    console.error("Error deleting resource:", error);
    return { success: false, error: error.message || "Failed to delete resource" };
  }
};

export const getSavedResourcesByUserId = async (userId: string): Promise<Resource[]> => {
  try {
    // First get the saved resource IDs for this user
    const { data: savedData, error: savedError } = await supabase
      .from('saved_resources')
      .select('resource_id')
      .eq('user_id', userId);

    if (savedError) {
      throw savedError;
    }

    if (!savedData || savedData.length === 0) {
      return [];
    }

    // Extract the resource IDs
    const resourceIds = savedData.map(item => item.resource_id);

    // Then fetch the actual resource data
    const { data: resourcesData, error: resourcesError } = await supabase
      .from('resources')
      .select('*')
      .in('id', resourceIds);

    if (resourcesError) {
      throw resourcesError;
    }

    return resourcesData || [];
  } catch (error) {
    console.error("Error fetching saved resources:", error);
    return [];
  }
};

export const toggleSaveResource = async (userId: string, resourceId: string): Promise<{ success: boolean; saved: boolean; error?: string }> => {
  try {
    // Check if the resource is already saved
    const { data: existingData, error: checkError } = await supabase
      .from('saved_resources')
      .select('id')
      .eq('user_id', userId)
      .eq('resource_id', resourceId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
      throw checkError;
    }

    if (existingData) {
      // Resource is already saved, so unsave it
      const { error: deleteError } = await supabase
        .from('saved_resources')
        .delete()
        .eq('id', existingData.id);

      if (deleteError) {
        throw deleteError;
      }

      return { success: true, saved: false };
    } else {
      // Resource is not saved, so save it
      const { error: insertError } = await supabase
        .from('saved_resources')
        .insert({ user_id: userId, resource_id: resourceId });

      if (insertError) {
        throw insertError;
      }

      return { success: true, saved: true };
    }
  } catch (error: any) {
    console.error("Error toggling saved resource:", error);
    return { success: false, saved: false, error: error.message };
  }
};

export const isResourceSaved = async (userId: string, resourceId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('saved_resources')
      .select('id')
      .eq('user_id', userId)
      .eq('resource_id', resourceId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error("Error checking if resource is saved:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Error checking if resource is saved:", error);
    return false;
  }
};
