
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Run this once when the app starts
    checkAndCreateTables()
      .then(() => console.log("Database schema check completed"))
      .catch(err => console.error("Error during database schema check:", err));
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
