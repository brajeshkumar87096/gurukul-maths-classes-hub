
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/shared/ContactForm";
import { MessageSquare, Phone, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg text-gray-700">
                Have questions about our classes? Need help with a specific math topic?
                We're here to help you!
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-6">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-gurukul-purple/10 p-2 rounded-full mr-3">
                        <MessageSquare className="h-5 w-5 text-gurukul-purple" />
                      </div>
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-gray-700">+91 95230 85735</p>
                        <a 
                          href="https://wa.me/+919523085735" 
                          className="text-sm text-gurukul-purple hover:underline"
                        >
                          Send a message
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gurukul-purple/10 p-2 rounded-full mr-3">
                        <Phone className="h-5 w-5 text-gurukul-purple" />
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-700">+91 95230 85735</p>
                        <a 
                          href="tel:+919523085735" 
                          className="text-sm text-gurukul-purple hover:underline"
                        >
                          Call us
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gurukul-purple/10 p-2 rounded-full mr-3">
                        <Clock className="h-5 w-5 text-gurukul-purple" />
                      </div>
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-gray-700">
                          We typically respond within 24 hours during weekdays.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg border border-gray-100 p-6">
                  <h3 className="text-xl font-semibold mb-4">FAQ</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-1">Are the classes really free?</p>
                      <p className="text-gray-700 text-sm">
                        Yes, all our mathematics classes and resources are completely free for students.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">How do I access the PDF materials?</p>
                      <p className="text-gray-700 text-sm">
                        You can download the PDF materials directly from our Topics page.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">Do you offer one-on-one tutoring?</p>
                      <p className="text-gray-700 text-sm">
                        Yes, we can arrange one-on-one tutoring sessions. Contact us for more information.
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">Which grades do you support?</p>
                      <p className="text-gray-700 text-sm">
                        We provide mathematics resources for students in grades 1-10.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
