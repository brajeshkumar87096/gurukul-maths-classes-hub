
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TopicGrid = () => {
  const topics = [
    {
      name: "Algebra",
      icon: "➗",
      description: "Linear equations, polynomials, factoring, and more",
      color: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Geometry",
      icon: "📐",
      description: "Shapes, angles, area, perimeter, and volume",
      color: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      name: "Arithmetic",
      icon: "🔢",
      description: "Basic operations, fractions, decimals, and percentages",
      color: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      name: "Statistics",
      icon: "📊",
      description: "Data analysis, probability, and graphing",
      color: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      name: "Trigonometry",
      icon: "📏",
      description: "Sine, cosine, tangent, and triangles",
      color: "bg-rose-50",
      textColor: "text-rose-600",
    },
    {
      name: "Calculus",
      icon: "∫",
      description: "Limits, derivatives, integrals, and applications",
      color: "bg-teal-50",
      textColor: "text-teal-600",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-center md:text-left mb-4 md:mb-0">
            Popular Math Topics
          </h2>
          <Link to="/topics" className="flex items-center text-gurukul-purple hover:underline">
            View All Topics <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <Link to={`/topics/${topic.name.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
              <div className={`topic-card p-6 rounded-lg ${topic.color} border border-gray-100 h-full relative overflow-hidden`}>
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${topic.textColor}`}>{topic.name}</h3>
                <p className="text-gray-600">{topic.description}</p>
                <div className="topic-card-overlay absolute inset-0 bg-gradient-to-r from-gurukul-purple/20 to-gurukul-green/20 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white text-gurukul-purple py-2 px-4 rounded-full font-medium">
                    Explore Topic
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicGrid;
