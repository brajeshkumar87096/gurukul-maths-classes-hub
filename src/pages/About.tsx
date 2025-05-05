
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, CheckCircle, Award, Calendar, Users, GraduationCap, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">About Gurukul Maths Classes</h1>
              <p className="text-lg text-gray-700 mb-6">
                Empowering students with strong mathematical foundations through quality education since 2025.
              </p>
              <div className="flex justify-center">
                <img
                  src="/lovable-uploads/c1411fe7-4dcc-4c10-8a39-7ea33f4884a8.png"
                  alt="Gurukul Maths Classes"
                  className="h-32 w-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  At Gurukul Maths Classes, we believe that mathematics is a fundamental skill that every student should master. 
                  Our mission is to make quality mathematics education accessible to all students through our free online platform.
                </p>
                <p className="text-gray-700 mb-6">
                  We strive to break down complex mathematical concepts into understandable pieces, 
                  helping students build confidence and develop problem-solving skills that extend beyond the classroom.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gurukul-purple mr-2 mt-1" />
                    <p className="text-gray-700">Provide free, high-quality mathematics education</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gurukul-purple mr-2 mt-1" />
                    <p className="text-gray-700">Create comprehensive, topic-wise resources for grades 1-12</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gurukul-purple mr-2 mt-1" />
                    <p className="text-gray-700">Make learning mathematics engaging and accessible for all students</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gurukul-purple mr-2 mt-1" />
                    <p className="text-gray-700">Build strong mathematical foundations for future academic success</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <Book className="h-10 w-10 text-gurukul-purple mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Topic-wise Learning</h3>
                  <p className="text-gray-600">Structured curriculum organized by mathematical topics</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <Award className="h-10 w-10 text-gurukul-purple mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Quality Resources</h3>
                  <p className="text-gray-600">Carefully crafted PDFs and learning materials</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <Calendar className="h-10 w-10 text-gurukul-purple mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Established 2025</h3>
                  <p className="text-gray-600">New and innovative approach to mathematics education</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <Users className="h-10 w-10 text-gurukul-purple mb-4" />
                  <h3 className="text-xl font-semibold mb-2">For All Students</h3>
                  <p className="text-gray-600">Inclusive learning for students of all abilities</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Teacher's Profile</h2>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                <div className="flex flex-col md:flex-row items-center mb-6">
                  <div className="mb-4 md:mb-0 md:mr-6">
                    <div className="bg-gurukul-purple/10 p-4 rounded-full">
                      <GraduationCap className="h-16 w-16 text-gurukul-purple" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Brajesh Kumar</h3>
                    <p className="text-gray-600 mb-2">5+ years of experience in mathematics education</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gurukul-green/20 text-gurukul-green text-sm py-1 px-2 rounded-full">
                        Chegg Expert
                      </span>
                      <span className="bg-gurukul-purple/20 text-gurukul-purple text-sm py-1 px-2 rounded-full">
                        Course Hero Educator
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6 mt-6">
                  <h4 className="text-xl font-semibold mb-4">Experience & Expertise</h4>
                  <p className="text-gray-700 mb-4">
                    With over 5 years of experience on leading educational platforms like Chegg and Course Hero, 
                    Brajesh Kumar has helped thousands of students master mathematical concepts and improve their grades.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Specializing in breaking down complex topics into understandable components,
                    his teaching approach focuses on building strong foundations and developing
                    critical thinking skills that help students succeed in mathematics and beyond.
                  </p>
                  
                  <h4 className="text-xl font-semibold mb-4">Teaching Philosophy</h4>
                  <p className="text-gray-700 mb-4">
                    Brajesh believes that every student can excel in mathematics with the right guidance and resources.
                    His teaching philosophy centers on:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gurukul-purple mr-2 mt-1" />
                      <p className="text-gray-700">Making complex concepts simple and understandable</p>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gurukul-purple mr-2 mt-1" />
                      <p className="text-gray-700">Building confidence through progressive skill development</p>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gurukul-purple mr-2 mt-1" />
                      <p className="text-gray-700">Providing practical applications and real-world examples</p>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-gurukul-purple mr-2 mt-1" />
                      <p className="text-gray-700">Encouraging critical thinking and problem-solving skills</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button asChild className="bg-gurukul-purple hover:bg-gurukul-purple/90">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
