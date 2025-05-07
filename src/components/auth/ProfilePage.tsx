
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

interface Profile {
  full_name: string;
  grade?: string;
  avatar_url?: string;
  updated_at: string;
}

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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
      <Card className="shadow-md">
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
    </div>
  );
};

export default ProfilePage;
