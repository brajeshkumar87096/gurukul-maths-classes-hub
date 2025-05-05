
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Download, Search } from "lucide-react";

const Topics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for topics and PDFs
  const gradeTopics = {
    "primary": [
      {
        grade: "Grade 1-2",
        topics: [
          { name: "Counting and Numbers", pdfs: ["Introduction to Numbers.pdf", "Counting Practice.pdf"] },
          { name: "Addition", pdfs: ["Basic Addition.pdf", "Addition Word Problems.pdf"] },
          { name: "Subtraction", pdfs: ["Basic Subtraction.pdf", "Subtraction Practice.pdf"] },
          { name: "Shapes", pdfs: ["2D Shapes.pdf", "Shape Recognition.pdf"] },
          { name: "Time", pdfs: ["Telling Time.pdf", "Clock Practice.pdf"] },
        ]
      },
      {
        grade: "Grade 3-4",
        topics: [
          { name: "Multiplication", pdfs: ["Times Tables.pdf", "Multiplication Practice.pdf"] },
          { name: "Division", pdfs: ["Basic Division.pdf", "Division Word Problems.pdf"] },
          { name: "Fractions", pdfs: ["Introduction to Fractions.pdf", "Fraction Comparison.pdf"] },
          { name: "Measurement", pdfs: ["Units of Measurement.pdf", "Measurement Practice.pdf"] },
          { name: "Patterns", pdfs: ["Number Patterns.pdf", "Pattern Recognition.pdf"] },
        ]
      },
    ],
    "middle": [
      {
        grade: "Grade 5-6",
        topics: [
          { name: "Decimals", pdfs: ["Decimal Operations.pdf", "Decimal Problems.pdf"] },
          { name: "Percentages", pdfs: ["Introduction to Percentages.pdf", "Percentage Calculations.pdf"] },
          { name: "Area and Perimeter", pdfs: ["Area of Shapes.pdf", "Perimeter Practice.pdf"] },
          { name: "Angles", pdfs: ["Types of Angles.pdf", "Angle Measurement.pdf"] },
          { name: "Data Handling", pdfs: ["Charts and Graphs.pdf", "Data Analysis.pdf"] },
        ]
      },
      {
        grade: "Grade 7-8",
        topics: [
          { name: "Pre-Algebra", pdfs: ["Variables and Expressions.pdf", "Solving Equations.pdf"] },
          { name: "Geometry", pdfs: ["Triangles and Quadrilaterals.pdf", "Geometric Properties.pdf"] },
          { name: "Ratio and Proportion", pdfs: ["Understanding Ratios.pdf", "Proportional Relationships.pdf"] },
          { name: "Statistics", pdfs: ["Mean, Median, Mode.pdf", "Data Representation.pdf"] },
          { name: "Integers", pdfs: ["Integer Operations.pdf", "Negative Numbers.pdf"] },
        ]
      },
    ],
    "high": [
      {
        grade: "Grade 9-10",
        topics: [
          { name: "Algebra", pdfs: ["Linear Equations.pdf", "Quadratic Functions.pdf", "Systems of Equations.pdf"] },
          { name: "Geometry", pdfs: ["Coordinate Geometry.pdf", "Transformations.pdf", "Trigonometric Ratios.pdf"] },
          { name: "Statistics and Probability", pdfs: ["Probability Concepts.pdf", "Statistical Analysis.pdf"] },
          { name: "Functions", pdfs: ["Function Notation.pdf", "Graphing Functions.pdf"] },
          { name: "Exponents and Logarithms", pdfs: ["Exponent Rules.pdf", "Logarithm Basics.pdf"] },
        ]
      }
    ]
  };

  // Filter topics based on search term
  const filterTopics = (topics: any[]) => {
    if (!searchTerm) return topics;
    
    return topics.filter(topic => 
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDownload = (pdf: string) => {
    // Mock function for PDF download
    alert(`Downloading ${pdf}...`);
    // In a real implementation, this would trigger a download
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-white to-gray-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">Mathematics Topics</h1>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Explore our comprehensive collection of mathematics topics and resources organized by grade level.
            </p>
            
            <div className="relative max-w-md mx-auto mb-8">
              <Input
                placeholder="Search for a topic..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 py-6 text-base"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="primary" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="primary">Primary (Grades 1-4)</TabsTrigger>
                <TabsTrigger value="middle">Middle (Grades 5-8)</TabsTrigger>
                <TabsTrigger value="high">High (Grades 9-10)</TabsTrigger>
              </TabsList>
              
              {Object.entries(gradeTopics).map(([key, gradeGroup]) => (
                <TabsContent key={key} value={key} className="space-y-12">
                  {gradeGroup.map((grade, gradeIndex) => (
                    <div key={gradeIndex}>
                      <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{grade.grade}</h2>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filterTopics(grade.topics).map((topic, topicIndex) => (
                          <div 
                            key={topicIndex} 
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="bg-gray-50 p-4 border-b">
                              <h3 className="text-xl font-semibold">{topic.name}</h3>
                            </div>
                            <div className="p-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                                <FileText className="h-4 w-4 mr-1" /> Available PDFs
                              </h4>
                              <ul className="space-y-2">
                                {topic.pdfs.map((pdf, pdfIndex) => (
                                  <li key={pdfIndex} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-700">{pdf}</span>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="flex items-center text-gurukul-purple border-gurukul-purple"
                                      onClick={() => handleDownload(pdf)}
                                    >
                                      <Download className="h-3 w-3 mr-1" />
                                      Download
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Topics;
