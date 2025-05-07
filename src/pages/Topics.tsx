
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Download, Search, Loader2 } from "lucide-react";
import { fetchAllTopics, fetchResourcesByTopicId, downloadResource } from "@/services/topicService";
import { Topic, Resource } from "@/lib/supabase";
import { toast } from "sonner";

interface GroupedTopics {
  [key: string]: {
    grade: string;
    topics: Array<{
      id: string;
      name: string;
      resources: Resource[];
    }>;
  }[];
}

const Topics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [groupedTopics, setGroupedTopics] = useState<GroupedTopics>({});
  const [resourcesByTopic, setResourcesByTopic] = useState<Record<string, Resource[]>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true);
      try {
        // Fetch all topics
        const topicsData = await fetchAllTopics();
        setAllTopics(topicsData);
        
        // Group topics by grade level
        const grouped: GroupedTopics = {
          primary: [
            { grade: "Grade 1-2", topics: [] },
            { grade: "Grade 3-4", topics: [] }
          ],
          middle: [
            { grade: "Grade 5-6", topics: [] },
            { grade: "Grade 7-8", topics: [] }
          ],
          high: [
            { grade: "Grade 9-10", topics: [] },
            { grade: "Grade 11-12", topics: [] }
          ]
        };
        
        // Simple mapping based on topic name to determine grade level
        // In a real app, this would come from a field in the database
        for (const topic of topicsData) {
          const placeTopic = (gradeGroup: string, gradeIndex: number) => {
            if (!grouped[gradeGroup][gradeIndex].topics.some(t => t.id === topic.id)) {
              grouped[gradeGroup][gradeIndex].topics.push({
                id: topic.id,
                name: topic.name,
                resources: []
              });
            }
          };
          
          // Assign topics to grade levels based on a simple algorithm
          // This is just a placeholder - in a real app, topics would have a grade field
          const topicNameLower = topic.name.toLowerCase();
          if (topicNameLower.includes('arithmetic')) {
            placeTopic('primary', 0);
          } else if (topicNameLower.includes('algebra')) {
            if (topicNameLower.includes('advanced')) {
              placeTopic('high', 1);
            } else {
              placeTopic('middle', 1);
            }
          } else if (topicNameLower.includes('calculus')) {
            placeTopic('high', 1);
          } else if (topicNameLower.includes('geometry')) {
            placeTopic('middle', 0);
          } else if (topicNameLower.includes('trigonometry')) {
            placeTopic('high', 0);
          } else if (topicNameLower.includes('statistics')) {
            placeTopic('high', 0);
          } else {
            // Default placement
            const random = Math.floor(Math.random() * 6);
            const gradeGroup = random < 2 ? 'primary' : random < 4 ? 'middle' : 'high';
            const gradeIndex = random % 2;
            placeTopic(gradeGroup, gradeIndex);
          }
        }
        
        setGroupedTopics(grouped);
        
        // Load resources for each topic
        const resourcesMap: Record<string, Resource[]> = {};
        for (const topic of topicsData) {
          try {
            const topicResources = await fetchResourcesByTopicId(topic.id);
            resourcesMap[topic.id] = topicResources;
          } catch (error) {
            console.error(`Error fetching resources for topic ${topic.id}:`, error);
            resourcesMap[topic.id] = [];
          }
        }
        setResourcesByTopic(resourcesMap);
        
      } catch (error) {
        console.error("Error loading topics:", error);
        toast.error("Failed to load topics");
      } finally {
        setLoading(false);
      }
    };

    loadTopics();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      toast.info(`Preparing ${fileName} for download...`);
      const downloadUrl = await downloadResource(filePath);
      
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Downloading ${fileName}`);
    } catch (error) {
      console.error("Error downloading resource:", error);
      toast.error("Failed to download resource");
    }
  };

  // Filter topics based on search term
  const filterTopics = (topics: Array<{ id: string; name: string; resources: Resource[] }>) => {
    if (!searchTerm) return topics;
    
    return topics.filter(topic => 
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-gurukul-purple mx-auto" />
            <p className="mt-4 text-gray-600">Loading topics...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                <TabsTrigger value="high">High (Grades 9-12)</TabsTrigger>
              </TabsList>
              
              {Object.entries(groupedTopics).map(([key, gradeGroup]) => (
                <TabsContent key={key} value={key} className="space-y-12">
                  {gradeGroup.map((grade, gradeIndex) => (
                    <div key={gradeIndex}>
                      <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{grade.grade}</h2>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filterTopics(grade.topics).map((topic) => (
                          <div 
                            key={topic.id} 
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                              <h3 className="text-xl font-semibold">{topic.name}</h3>
                              <Link 
                                to={`/topics/${topic.id}`}
                                className="text-sm text-gurukul-purple hover:underline"
                              >
                                View Topic
                              </Link>
                            </div>
                            <div className="p-4">
                              <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                                <FileText className="h-4 w-4 mr-1" /> Available Resources
                              </h4>
                              {resourcesByTopic[topic.id]?.length > 0 ? (
                                <ul className="space-y-2">
                                  {resourcesByTopic[topic.id]?.map((resource) => (
                                    <li key={resource.id} className="flex justify-between items-center text-sm">
                                      <span className="text-gray-700">{resource.title}</span>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="flex items-center text-gurukul-purple border-gurukul-purple"
                                        onClick={() => handleDownload(resource.file_path, resource.title)}
                                      >
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-gray-500 text-sm">No resources available yet.</p>
                              )}
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
