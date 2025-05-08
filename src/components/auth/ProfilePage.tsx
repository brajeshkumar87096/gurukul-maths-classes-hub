
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User, Loader2, Download } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { getSavedResources } from "@/services/resourceService";
import { Resource } from "@/lib/supabase";
import { downloadResource } from "@/services/topicService";

interface Profile {
  full_name: string;
  grade?: string;
  avatar_url?: string;
  updated_at: string;
}

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [savedResources, setSavedResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSaved, setLoadingSaved] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfile(data);
        
        // Load saved resources
        setLoadingSaved(true);
        const savedResourceIds = await getSavedResources(user.id);
        
        // Fetch the actual resource details for each saved resource ID
        if (savedResourceIds.length > 0) {
          const { data: resourcesData, error: resourcesError } = await supabase
            .from('resources')
            .select('*')
            .in('id', savedResourceIds);
          
          if (resourcesError) {
            throw resourcesError;
          }
          
          setSavedResources(resourcesData || []);
        } else {
          setSavedResources([]);
        }
        setLoadingSaved(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
  };
  
  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      toast.info(`Preparing ${fileName} for download...`);
      const downloadUrl = await downloadResource(filePath);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Downloading ${fileName}`);
    } catch (error) {
      console.error("Error downloading resource:", error);
      toast.error("Failed to download resource");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gurukul-purple" />
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="w-full h-48 flex items-center justify-center flex-col gap-4">
        <p className="text-gray-500">You need to be logged in to view your profile.</p>
        <Button asChild className="bg-gurukul-purple hover:bg-gurukul-purple/90">
          <a href="/login">Sign In</a>
        </Button>
      </div>
    );
  }

  // Format the date
  const joinDate = new Date(profile.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      <Card className="shadow-md mb-8">
        <CardHeader className="pb-4 pt-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="bg-gurukul-purple/10 rounded-full p-4 flex items-center justify-center">
              <User className="h-12 w-12 text-gurukul-purple" />
            </div>
            <div>
              <CardTitle className="text-2xl">{profile.full_name}</CardTitle>
              <CardDescription className="text-gray-500">{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.grade && (
              <div>
                <h3 className="font-medium text-sm text-gray-500">Grade</h3>
                <p className="mt-1">{profile.grade}</p>
              </div>
            )}
            <div>
              <h3 className="font-medium text-sm text-gray-500">Joined</h3>
              <p className="mt-1">{joinDate}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button 
            onClick={handleLogout} 
            className="ml-auto bg-gurukul-purple hover:bg-gurukul-purple/90"
          >
            Log out
          </Button>
        </CardFooter>
      </Card>
      
      {/* Saved Resources Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Saved Resources</CardTitle>
          <CardDescription>Your personalized collection of educational materials</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingSaved ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-gurukul-purple" />
            </div>
          ) : savedResources.length > 0 ? (
            <div className="divide-y">
              {savedResources.map((resource) => (
                <div key={resource.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                      <div className="flex gap-2 text-xs text-gray-400 mt-2">
                        <span>{resource.file_type.toUpperCase()}</span>
                        <span>•</span>
                        <span>{resource.file_size}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-gurukul-purple border-gurukul-purple"
                      onClick={() => handleDownload(resource.file_path, resource.title)}
                    >
                      <Download className="mr-1 h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>You haven't saved any resources yet.</p>
              <Button asChild variant="link" className="text-gurukul-purple mt-2">
                <Link to="/topics">Browse Topics</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
