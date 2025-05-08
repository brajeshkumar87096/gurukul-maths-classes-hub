
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, Mail, KeyRound, Phone } from "lucide-react";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    
    // For demo purposes, we'll just simulate a signup
    // In a real app, this would connect to an authentication service
    setTimeout(() => {
      setIsLoading(false);
      // Store some basic user info in localStorage for the profile page
      localStorage.setItem("user", JSON.stringify({ 
        email: formData.email, 
        name: formData.name,
        grade: formData.grade,
        phone: formData.phone,
        joinDate: new Date().toISOString()
      }));
      toast.success("Account created successfully!");
      navigate("/profile");
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-gray-500 mt-2">Sign up to access math resources</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <User className="h-4 w-4" />
            </span>
            <Input 
              id="name" 
              name="name"
              placeholder="Enter your name" 
              value={formData.name}
              onChange={handleChange}
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
              name="email"
              type="email" 
              placeholder="you@example.com" 
              value={formData.email}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <Phone className="h-4 w-4" />
            </span>
            <Input 
              id="phone" 
              name="phone"
              placeholder="Your phone number" 
              value={formData.phone}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="grade">Grade</Label>
          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gurukul-purple/50"
            required
          >
            <option value="">Select Grade</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
              <option key={grade} value={`Grade ${grade}`}>
                Grade {grade}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <KeyRound className="h-4 w-4" />
            </span>
            <Input 
              id="password" 
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">
              <KeyRound className="h-4 w-4" />
            </span>
            <Input 
              id="confirmPassword" 
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
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
          {isLoading ? "Creating account..." : "Create Account"}
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
