
import { BookOpen, FileText, GraduationCap, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <GraduationCap className="h-10 w-10 text-gurukul-purple" />,
      title: "Grades 1-10",
      description: "Comprehensive mathematics curriculum tailored for students from grades 1 to 10.",
    },
    {
      icon: <FileText className="h-10 w-10 text-gurukul-purple" />,
      title: "Topic-wise Learning",
      description: "Organized by topics to help students master specific mathematical concepts.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-gurukul-purple" />,
      title: "Free PDF Resources",
      description: "Access to quality study materials for practice and better understanding.",
    },
    {
      icon: <Users className="h-10 w-10 text-gurukul-purple" />,
      title: "Experienced Teacher",
      description: "Learn from a teacher with 5+ years of experience on Chegg and Course Hero.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Gurukul Maths Classes?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
