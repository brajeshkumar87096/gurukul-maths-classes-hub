
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Welcome to{" "}
              <span className="text-gurukul-purple">Gurukul</span>{" "}
              <span className="text-gurukul-gold">Maths Classes</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Free online mathematics education for grades 1-10. Topic-wise lessons with 
              comprehensive PDFs to enhance learning and build strong mathematical foundations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-gurukul-purple hover:bg-gurukul-purple/90">
                <Link to="/topics">Browse Topics</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-gurukul-purple text-gurukul-purple hover:bg-gurukul-purple/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-gurukul-green/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gurukul-purple/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <img
                  src="/lovable-uploads/c1411fe7-4dcc-4c10-8a39-7ea33f4884a8.png"
                  alt="Gurukul Maths Classes"
                  className="w-72 h-72 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
