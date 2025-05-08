
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, User, KeyRound, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Submitting sign up form:", { email, fullName });
      const { success, error } = await signUp(email, password, fullName);
      
      if (success) {
        toast.success("Account created successfully!");
        navigate("/profile");
      } else {
        console.error("Sign up error:", error);
        setError(error || "Failed to create account. Please try again.");
        toast.error(error || "Failed to create account");
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "An unexpected error occurred");
      toast.error(err.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-gray-500 mt-2">Enter your information to get started</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>{error}</div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <User className="h-4 w-4" />
            </span>
            <Input 
              id="name" 
              type="text" 
              placeholder="John Doe" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <Mail className="h-4 w-4" />
            </span>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <KeyRound className="h-4 w-4" />
            </span>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
              minLength={6}
            />
          </div>
          <p className="text-xs text-gray-500">
            Password must be at least 6 characters long
          </p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gurukul-purple hover:bg-gurukul-purple/90"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-gurukul-purple hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
