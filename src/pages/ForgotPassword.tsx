
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <ForgotPasswordForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
