
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const checkLoginStatus = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkLoginStatus();
    // Add event listener to check login status when localStorage changes
    window.addEventListener("storage", checkLoginStatus);
    
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Topics", path: "/topics" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/18d57b91-4ef9-42f4-8d60-b54e94b1b951.png" 
                alt="Gurukul Maths Classes" 
                className="h-10 w-auto mr-2" 
              />
              <span className="font-bold text-lg text-gurukul-purple">Gurukul</span>
              <span className="font-medium text-gurukul-gold ml-1">Maths</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-item ${isActive(item.path) ? "active-nav-item" : ""}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Button asChild className="bg-gurukul-purple hover:bg-gurukul-purple/90">
                <Link to="/profile" className="flex items-center gap-2">
                  <User size={18} />
                  Profile
                </Link>
              </Button>
            ) : (
              <Button asChild className="bg-gurukul-purple hover:bg-gurukul-purple/90">
                <Link to="/login" className="flex items-center gap-2">
                  <User size={18} />
                  Login
                </Link>
              </Button>
            )}
            <Button className="bg-gurukul-purple hover:bg-gurukul-purple/90">
              <a href="https://wa.me/9523085735" className="flex items-center">
                Connect on WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-100"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? "text-gurukul-purple bg-gray-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
            <div className="px-3 py-3">
              <Button className="w-full bg-gurukul-purple hover:bg-gurukul-purple/90">
                <a href="https://wa.me/9523085735" className="flex items-center justify-center w-full">
                  Connect on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
