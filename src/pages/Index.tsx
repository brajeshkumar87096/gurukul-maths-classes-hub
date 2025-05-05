
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TopicGrid from "@/components/home/TopicGrid";
import ContactForm from "@/components/shared/ContactForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <TopicGrid />
        
        {/* Teacher Profile */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Meet Your Teacher</h2>
                <p className="text-lg text-gray-700 mb-6">
                  With over 5 years of experience on Chegg and Course Hero mathematics platforms, 
                  our teacher Brajesh Kumar brings expertise and passion to every lesson.
                </p>
                <p className="text-gray-700 mb-6">
                  Specializing in breaking down complex concepts into understandable pieces, 
                  our approach ensures students not only learn mathematics but truly understand it.
                </p>
                <Button asChild className="bg-gurukul-purple hover:bg-gurukul-purple/90">
                  <Link to="/about">Learn More About Us</Link>
                </Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-gradient-to-br from-gurukul-green/30 to-gurukul-purple/30 p-1 rounded-lg">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-center mb-4">
                      <div className="inline-block p-2 rounded-full bg-gurukul-purple/10 mb-4">
                        <GraduationCapIcon className="h-16 w-16 text-gurukul-purple" />
                      </div>
                      <h3 className="text-xl font-bold">Brajesh Kumar</h3>
                      <p className="text-gray-500">5+ Years Experience</p>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-gurukul-green mr-2" />
                        <span>Chegg Expert Tutor</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-gurukul-green mr-2" />
                        <span>Course Hero Educator</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-gurukul-green mr-2" />
                        <span>Free Online Classes</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-gurukul-green mr-2" />
                        <span>Comprehensive Study Materials</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Have questions about our classes? Need help with a specific math topic?
                Reach out to Brajesh Kumar and let us know how we can assist you!
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-gurukul-purple py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Excel in Mathematics?
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Join Gurukul Maths Classes today and get access to free math resources tailored for grades 1-12.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/topics" className="flex items-center">
                Explore Our Topics <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Helper Icons
const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const GraduationCapIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
  </svg>
);

export default Index;
