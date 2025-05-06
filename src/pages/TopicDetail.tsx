
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, BookOpen, Clock, FileText } from "lucide-react";
import { toast } from "sonner";

interface TopicResource {
  title: string;
  description: string;
  type: "pdf" | "video" | "quiz";
  filename: string;
  size?: string;
  dateAdded: string;
}

interface TopicData {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  textColor: string;
  longDescription: string;
  resources: TopicResource[];
  relatedTopics: {
    id: string;
    name: string;
    icon: string;
  }[];
}

// This is a mock database of topics - in a real application, this would come from a backend
const topicsData: Record<string, TopicData> = {
  "algebra": {
    id: "algebra",
    name: "Algebra",
    icon: "➗",
    description: "Linear equations, polynomials, factoring, and more",
    color: "bg-blue-50",
    textColor: "text-blue-600",
    longDescription: "Algebra is one of the broad parts of mathematics, together with number theory, geometry and analysis. In its most general form, algebra is the study of mathematical symbols and the rules for manipulating these symbols; it is a unifying thread of almost all of mathematics.",
    resources: [
      {
        title: "Introduction to Algebra",
        description: "Basic concepts and operations in algebra",
        type: "pdf",
        filename: "intro_to_algebra.pdf",
        size: "1.2 MB",
        dateAdded: "2025-01-10"
      },
      {
        title: "Linear Equations",
        description: "Solving one and two-variable linear equations",
        type: "pdf",
        filename: "linear_equations.pdf",
        size: "2.4 MB",
        dateAdded: "2025-01-15"
      },
      {
        title: "Polynomials and Factoring",
        description: "Working with polynomial expressions",
        type: "pdf",
        filename: "polynomials.pdf", 
        size: "3.1 MB",
        dateAdded: "2025-01-20"
      },
    ],
    relatedTopics: [
      { id: "calculus", name: "Calculus", icon: "∫" },
      { id: "trigonometry", name: "Trigonometry", icon: "📏" }
    ]
  },
  "geometry": {
    id: "geometry",
    name: "Geometry",
    icon: "📐",
    description: "Shapes, angles, area, perimeter, and volume",
    color: "bg-green-50",
    textColor: "text-green-600",
    longDescription: "Geometry is a branch of mathematics concerned with questions of shape, size, relative position of figures, and the properties of space. Geometry is one of the oldest mathematical sciences.",
    resources: [
      {
        title: "Introduction to Geometry",
        description: "Basic concepts and definitions in geometry",
        type: "pdf",
        filename: "intro_to_geometry.pdf",
        size: "1.8 MB",
        dateAdded: "2025-02-05"
      },
      {
        title: "Angles and Lines",
        description: "Understanding angle relationships and lines",
        type: "pdf",
        filename: "angles_and_lines.pdf",
        size: "2.2 MB",
        dateAdded: "2025-02-10"
      },
      {
        title: "Area and Volume",
        description: "Calculating area and volume of various shapes",
        type: "pdf",
        filename: "area_and_volume.pdf",
        size: "2.7 MB",
        dateAdded: "2025-02-15"
      }
    ],
    relatedTopics: [
      { id: "trigonometry", name: "Trigonometry", icon: "📏" },
      { id: "algebra", name: "Algebra", icon: "➗" }
    ]
  },
  "arithmetic": {
    id: "arithmetic",
    name: "Arithmetic",
    icon: "🔢",
    description: "Basic operations, fractions, decimals, and percentages",
    color: "bg-amber-50",
    textColor: "text-amber-600",
    longDescription: "Arithmetic is a branch of mathematics that consists of the study of numbers, especially the properties of the traditional operations on them—addition, subtraction, multiplication, division, exponentiation and extraction of roots.",
    resources: [
      {
        title: "Basic Arithmetic Operations",
        description: "Addition, subtraction, multiplication, and division",
        type: "pdf",
        filename: "basic_operations.pdf",
        size: "1.5 MB",
        dateAdded: "2025-03-01"
      },
      {
        title: "Fractions and Decimals",
        description: "Working with fractions and decimal numbers",
        type: "pdf",
        filename: "fractions_decimals.pdf",
        size: "2.0 MB",
        dateAdded: "2025-03-10"
      },
      {
        title: "Percentages",
        description: "Converting and calculating with percentages",
        type: "pdf",
        filename: "percentages.pdf",
        size: "1.7 MB",
        dateAdded: "2025-03-15"
      }
    ],
    relatedTopics: [
      { id: "algebra", name: "Algebra", icon: "➗" },
      { id: "statistics", name: "Statistics", icon: "📊" }
    ]
  },
  "statistics": {
    id: "statistics",
    name: "Statistics",
    icon: "📊",
    description: "Data analysis, probability, and graphing",
    color: "bg-purple-50",
    textColor: "text-purple-600",
    longDescription: "Statistics is the discipline that concerns the collection, organization, analysis, interpretation, and presentation of data. In applying statistics to a scientific, industrial, or social problem, it is conventional to begin with a statistical population or a statistical model to be studied.",
    resources: [
      {
        title: "Introduction to Statistics",
        description: "Basic statistical concepts and data representation",
        type: "pdf",
        filename: "intro_to_statistics.pdf",
        size: "2.3 MB",
        dateAdded: "2025-04-01"
      },
      {
        title: "Probability",
        description: "Basic probability theory and applications",
        type: "pdf",
        filename: "probability.pdf",
        size: "2.6 MB",
        dateAdded: "2025-04-10"
      },
      {
        title: "Data Analysis",
        description: "Methods for analyzing and interpreting data",
        type: "pdf",
        filename: "data_analysis.pdf",
        size: "3.0 MB",
        dateAdded: "2025-04-15"
      }
    ],
    relatedTopics: [
      { id: "arithmetic", name: "Arithmetic", icon: "🔢" },
      { id: "calculus", name: "Calculus", icon: "∫" }
    ]
  },
  "trigonometry": {
    id: "trigonometry",
    name: "Trigonometry",
    icon: "📏",
    description: "Sine, cosine, tangent, and triangles",
    color: "bg-rose-50",
    textColor: "text-rose-600",
    longDescription: "Trigonometry is a branch of mathematics that studies relationships between side lengths and angles of triangles. The field emerged in the Hellenistic world during the 3rd century BC from applications of geometry to astronomical studies.",
    resources: [
      {
        title: "Introduction to Trigonometry",
        description: "Basic trigonometric functions and relationships",
        type: "pdf",
        filename: "intro_to_trigonometry.pdf",
        size: "2.1 MB",
        dateAdded: "2025-05-01"
      },
      {
        title: "Trigonometric Functions",
        description: "Sine, cosine, tangent and their applications",
        type: "pdf",
        filename: "trig_functions.pdf",
        size: "2.5 MB",
        dateAdded: "2025-05-10"
      },
      {
        title: "Triangles and Applications",
        description: "Solving triangles and real-world applications",
        type: "pdf",
        filename: "triangles_applications.pdf",
        size: "2.9 MB",
        dateAdded: "2025-05-15"
      }
    ],
    relatedTopics: [
      { id: "geometry", name: "Geometry", icon: "📐" },
      { id: "calculus", name: "Calculus", icon: "∫" }
    ]
  },
  "calculus": {
    id: "calculus",
    name: "Calculus",
    icon: "∫",
    description: "Limits, derivatives, integrals, and applications",
    color: "bg-teal-50",
    textColor: "text-teal-600",
    longDescription: "Calculus, originally called infinitesimal calculus or 'the calculus of infinitesimals', is the mathematical study of continuous change, in the same way that geometry is the study of shape and algebra is the study of generalizations of arithmetic operations.",
    resources: [
      {
        title: "Introduction to Calculus",
        description: "Basic concepts of limits and continuity",
        type: "pdf",
        filename: "intro_to_calculus.pdf",
        size: "2.8 MB",
        dateAdded: "2025-06-01"
      },
      {
        title: "Differentiation",
        description: "Rules and applications of differentiation",
        type: "pdf",
        filename: "differentiation.pdf",
        size: "3.2 MB",
        dateAdded: "2025-06-10"
      },
      {
        title: "Integration",
        description: "Techniques and applications of integration",
        type: "pdf",
        filename: "integration.pdf",
        size: "3.5 MB",
        dateAdded: "2025-06-15"
      }
    ],
    relatedTopics: [
      { id: "algebra", name: "Algebra", icon: "➗" },
      { id: "trigonometry", name: "Trigonometry", icon: "📏" }
    ]
  }
};

const TopicDetail = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchTopic = () => {
      setLoading(true);
      setTimeout(() => {
        if (topicId && topicsData[topicId]) {
          setTopic(topicsData[topicId]);
        }
        setLoading(false);
      }, 300);
    };

    fetchTopic();
  }, [topicId]);

  const handleDownload = (filename: string) => {
    // In a real app, this would trigger an actual download from backend/storage
    toast.success(`Downloading ${filename}...`);
    // Simulate download delay
    setTimeout(() => {
      toast.info("Download completed!");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gurukul-purple mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading topic...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-6">Topic Not Found</h1>
            <p className="text-gray-700 mb-8">
              The topic you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link to="/topics">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Topics
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Topic Header */}
        <div className={`${topic.color} py-16`}>
          <div className="container mx-auto px-4">
            <Link to="/topics" className="inline-flex items-center text-gray-600 hover:text-gurukul-purple mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Topics
            </Link>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="text-6xl">{topic.icon}</div>
              <div>
                <h1 className={`text-4xl font-bold ${topic.textColor}`}>
                  {topic.name}
                </h1>
                <p className="text-lg text-gray-700 mt-2">
                  {topic.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Topic Content */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Overview</h2>
                <p className="text-gray-700 mb-8">
                  {topic.longDescription}
                </p>
                
                <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
                <div className="space-y-6">
                  {topic.resources.map((resource, idx) => (
                    <div key={idx} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                        <Button 
                          variant="outline" 
                          className="text-gurukul-purple border-gurukul-purple"
                          onClick={() => handleDownload(resource.filename)}
                        >
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                      </div>
                      <p className="text-gray-700 mb-4">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FileText className="mr-1 h-4 w-4" /> PDF
                        </span>
                        {resource.size && (
                          <span className="flex items-center">
                            <BookOpen className="mr-1 h-4 w-4" /> {resource.size}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" /> Added {formattedDate(resource.dateAdded)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sidebar */}
              <div>
                <div className="sticky top-24">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <h3 className="font-semibold">Related Topics</h3>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        {topic.relatedTopics.map((relatedTopic) => (
                          <li key={relatedTopic.id}>
                            <Link 
                              to={`/topics/${relatedTopic.id}`} 
                              className="flex items-center p-2 hover:bg-gray-50 rounded-md"
                            >
                              <span className="text-2xl mr-3">{relatedTopic.icon}</span>
                              <span>{relatedTopic.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-gurukul-purple/10 rounded-lg p-6 text-center">
                    <h3 className="font-semibold mb-3">Need Help With This Topic?</h3>
                    <p className="text-gray-700 mb-4">Contact our instructor directly for personalized assistance.</p>
                    <Button asChild className="w-full bg-gurukul-purple hover:bg-gurukul-purple/90">
                      <Link to="/contact">Contact Instructor</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TopicDetail;
