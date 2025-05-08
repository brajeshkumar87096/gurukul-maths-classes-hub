
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Password reset instructions sent!");
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6 text-center">
        <div className="rounded-full bg-green-100 p-3 w-16 h-16 flex items-center justify-center mx-auto">
          <Mail className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Check your email</h2>
        <p className="text-gray-500">
          We've sent password reset instructions to <span className="font-medium">{email}</span>
        </p>
        <div className="pt-4">
          <Link to="/login">
            <Button variant="outline" className="mx-auto">
              Back to login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Forgot password?</h1>
        <p className="text-gray-500 mt-2">
          No worries, we'll send you reset instructions.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <Button 
          type="submit" 
          className="w-full bg-gurukul-purple hover:bg-gurukul-purple/90"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Reset password"}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <Link to="/login" className="font-medium text-gurukul-purple hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
