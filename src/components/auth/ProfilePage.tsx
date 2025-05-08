
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  grade?: string;
  joinDate: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setProfile(userData);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    } else {
      // Redirect to login if no user data
      navigate("/login");
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return null; // This should not happen as navigate would redirect
  }

  // Format the date
  const joinDate = new Date(profile.joinDate).toLocaleDateString("en-US", {
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
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
              <CardDescription className="text-gray-500">{profile.email}</CardDescription>
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
