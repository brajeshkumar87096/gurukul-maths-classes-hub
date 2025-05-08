
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Topics from "./pages/Topics";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import TopicDetail from "./pages/TopicDetail";
import { AuthProvider } from "./context/AuthContext";
import { checkAndCreateTables } from "./lib/supabase";
import { toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    // Run this once when the app starts
    setTimeout(() => {
      checkAndCreateTables()
        .then((result) => {
          console.log("Database schema check completed");
          setDbInitialized(true);
          if (result.success) {
            toast.success("Database connected successfully");
          } else {
            toast.info("Using offline mode. Some features may be limited.");
          }
        })
        .catch(err => {
          console.error("Error during database schema check:", err);
          toast.info("Using offline mode. Some features may be limited.");
          // Still set initialized to true so app can work with limited functionality
          setDbInitialized(true);
        });
    }, 1500); // Longer delay to ensure client is properly initialized
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/topics/:topicId" element={<TopicDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
