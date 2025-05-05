
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MessageCircle } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for contacting Gurukul Maths Classes. We'll respond shortly.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        grade: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            Student's Grade
          </label>
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
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Your Message
          </label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you?"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-gurukul-purple hover:bg-gurukul-purple/90" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-medium mb-4 text-gray-800">Other ways to reach us:</h4>
        <div className="space-y-3">
          <a href="tel:+919523085735" className="flex items-center text-gray-700 hover:text-gurukul-purple">
            <Phone className="h-5 w-5 mr-2" />
            <span>+91 95230 85735</span>
          </a>
          <a href="https://wa.me/+919523085735" className="flex items-center text-gray-700 hover:text-gurukul-purple">
            <MessageCircle className="h-5 w-5 mr-2" />
            <span>WhatsApp: +91 95230 85735</span>
          </a>
          <a href="mailto:brajeshkumar87096@gmail.com" className="flex items-center text-gray-700 hover:text-gurukul-purple">
            <Mail className="h-5 w-5 mr-2" />
            <span>brajeshkumar87096@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
