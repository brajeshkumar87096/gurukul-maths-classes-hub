
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/lovable-uploads/c1411fe7-4dcc-4c10-8a39-7ea33f4884a8.png"
                alt="Gurukul Maths Classes"
                className="h-10 w-auto mr-2"
              />
              <span className="font-bold text-xl text-gurukul-purple">
                Gurukul Maths Classes
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Providing quality mathematics education through online classes for grades 1-12.
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Since 2025</span>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gurukul-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/topics" className="text-gray-600 hover:text-gurukul-purple transition-colors">
                  Topics
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gurukul-purple transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-gurukul-purple transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Instructor:</span> Brajesh Kumar
              </p>
              <p>
                <span className="font-medium">WhatsApp:</span> 8709601984
              </p>
              <p>
                <span className="font-medium">Phone:</span> 9523085735
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-1">Email:</span>
                <a href="mailto:brajeshkumar87096@gmail.com" className="text-gurukul-purple hover:underline">
                  brajeshkumar87096@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>© {currentYear} Gurukul Maths Classes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
