
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfilePage from "@/components/auth/ProfilePage";

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>
          <ProfilePage />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
